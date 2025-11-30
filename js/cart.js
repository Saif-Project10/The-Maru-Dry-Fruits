// cart.js - Updated with Modal Support

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutSection = document.getElementById('checkoutSection');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const checkoutForm = document.getElementById('checkoutForm');

    // Modal elements
    const modal = document.getElementById('customModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');
    const modalOkBtn = document.getElementById('modalOkBtn');
    const closeBtn = document.querySelector('.close-btn');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Show modal function
    function showModal(type, title, message) {
        if (!modal) {
            console.error('Modal not found!');
            alert(message);
            return;
        }

        // Reset all icons
        document.querySelectorAll('.modal-icon > *').forEach(icon => {
            icon.style.display = 'none';
        });

        // Set icon based on type
        if (type === 'success') {
            document.querySelector('.success-icon').style.display = 'block';
        } else if (type === 'error') {
            document.querySelector('.error-icon').style.display = 'block';
        } else if (type === 'warning') {
            document.querySelector('.warning-icon').style.display = 'block';
        }

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    // Close modal function
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Modal event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty. Add some delicious dry fruits!</div>';
            cartTotalEl.textContent = 'Rs. 0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>Price: Rs. ${item.price}</p>
                </div>
                <div class="cart-item-actions">
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}">
                    <button data-index="${index}" class="remove-btn">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalEl.textContent = `Rs. ${total}`;
        attachQuantityEvents();
        attachRemoveEvents();
    }

    function attachQuantityEvents() {
        const qtyInputs = document.querySelectorAll('.cart-item-actions input');
        qtyInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.dataset.index;
                let val = parseInt(e.target.value);
                if (val < 1) val = 1;
                cart[index].quantity = val;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    function attachRemoveEvents() {
        const removeBtns = document.querySelectorAll('.remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                showModal('success', 'Item Removed', 'The item has been removed from your cart.');
            });
        });
    }

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showModal('warning', 'Empty Cart', 'Your cart is empty! Please add some delicious dry fruits before checkout.');
            return;
        }
        checkoutSection.style.display = 'block';
        window.scrollTo({ top: checkoutSection.offsetTop, behavior: 'smooth' });
    });

    // Checkout form submit
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('customerName').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        
        // Validate form fields
        if (!name) {
            showModal('error', 'Missing Information', 'Please enter your name.');
            document.getElementById('customerName').focus();
            return;
        }
        
        if (!address) {
            showModal('error', 'Missing Information', 'Please enter your delivery address.');
            document.getElementById('customerAddress').focus();
            return;
        }
        
        if (!phone) {
            showModal('error', 'Missing Information', 'Please enter your phone number.');
            document.getElementById('customerPhone').focus();
            return;
        }
        
        // Validate phone number format
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
            showModal('error', 'Invalid Phone Number', 'Please enter a valid 10-11 digit phone number.');
            document.getElementById('customerPhone').focus();
            return;
        }

        // Show loading state
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate order processing
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('cart');
            cart = [];
            renderCart();

            // Reset form
            checkoutForm.reset();

            // Hide checkout section
            checkoutSection.style.display = 'none';

            // Show confirmation
            orderConfirmation.style.display = 'block';

            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Scroll to confirmation
            window.scrollTo({ top: orderConfirmation.offsetTop, behavior: 'smooth' });

            // Show success modal
            showModal('success', 'Order Placed Successfully!', 'Thank you for your purchase! Your order has been confirmed and will be delivered soon.');
        }, 2000);
    });

    // Go Back Button
    const goBackBtn = document.getElementById('goBackBtn');
    if (goBackBtn) {
        goBackBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    renderCart();
});