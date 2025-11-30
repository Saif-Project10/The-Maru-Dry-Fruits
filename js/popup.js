
// 🛍 Quick Shop Popup Functionality
const quickShopBtns = document.querySelectorAll('.quick-shop');
const popupOverlay = document.querySelector('.popup-overlay');
const closePopup = document.getElementById('closePopup');

const popupImg = document.getElementById('popupImg');
const popupTitle = document.getElementById('popupName');
const popupPrice = document.getElementById('popupPrice');
const popupOldPrice = document.getElementById('popupCutPrice');
const popupDesc = document.getElementById('popupDesc');
const popupQty = document.getElementById('popupQty');
const popupSize = document.getElementById('popupSize');

let basePrice = 0;
let oldPrice = 0;

// 🟢 Open Popup
quickShopBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card-container');

    // 🔹 Card elements se data lena
    const imgElement = card.querySelector("img");
    const nameElement = card.querySelector("h4");
    const descElement = card.querySelector("p");

    // 🔹 Popup me content set karna
    popupImg.src = imgElement.src;
    popupTitle.textContent = nameElement.textContent;
    popupDesc.textContent = descElement.textContent;

    // 🔹 Set base price from card dataset if exists
    basePrice = parseInt(card.dataset.price) || 999;
    oldPrice = parseInt(card.dataset.oldPrice) || 1200;

    popupQty.value = 1;       // Reset quantity
    popupSize.value = "1kg";  // Default size

    updatePrice(); // Initial price update
    popupOverlay.style.display = 'flex';
  });
});

// ❌ Close Popup
closePopup.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
});
if(popupOverlay){
  popupOverlay.addEventListener('click', (e) => {
    if(e.target === popupOverlay) popupOverlay.style.display = 'none';
  });
}

// ➕➖ Quantity & Size change price update
function updatePrice(){
  const qty = parseInt(popupQty.value) || 1;
  const size = popupSize.value;

  let sizeFactor = 1;
  if(size === "250g") sizeFactor = 0.25;
  else if(size === "500g") sizeFactor = 0.5;
  else if(size === "1kg") sizeFactor = 1;

  const newPrice = Math.round(basePrice * sizeFactor * qty);
  const newOldPrice = oldPrice ? Math.round(oldPrice * sizeFactor * qty) : 0;

  popupPrice.textContent = `Rs. ${newPrice}`;
  popupOldPrice.textContent = newOldPrice ? `Rs. ${newOldPrice}` : '';
}

popupQty.addEventListener('input', updatePrice);
popupSize.addEventListener('change', updatePrice);

// 🛒 Add to Cart with Custom Modal
document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.getElementById('addToCartBtn');

  // Create Cart Modal HTML
  const cartModalHTML = `
    <div id="cartModal" class="cart-modal">
      <div class="cart-modal-content">
        <span class="cart-modal-close">&times;</span>
        <div class="cart-modal-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 class="cart-modal-title">Success!</h3>
        <p class="cart-modal-message" id="cartModalMessage">Product added to cart successfully!</p>
        <div class="cart-modal-buttons">
          <button class="cart-modal-continue-btn">Continue Shopping</button>
          <button class="cart-modal-viewcart-btn">View Cart</button>
        </div>
      </div>
    </div>
  `;

  // Add Cart Modal to body
  document.body.insertAdjacentHTML('beforeend', cartModalHTML);

  const cartModal = document.getElementById('cartModal');
  const cartModalClose = document.querySelector('.cart-modal-close');
  const cartModalMessage = document.getElementById('cartModalMessage');
  const continueBtn = document.querySelector('.cart-modal-continue-btn');
  const viewCartBtn = document.querySelector('.cart-modal-viewcart-btn');

  // Show Cart Modal Function
  function showCartModal(message) {
    cartModalMessage.textContent = message;
    cartModal.style.display = 'block';
  }

  // Close Cart Modal Functions
  function closeCartModal() {
    cartModal.style.display = 'none';
  }

  // Redirect to Cart Page
  function redirectToCart() {
    window.location.href = "cart.html"; // Aap ka cart page URL
  }

  cartModalClose.addEventListener('click', closeCartModal);
  
  continueBtn.addEventListener('click', () => {
    closeCartModal();
    popupOverlay.style.display = 'none'; // Product popup bhi close karega
  });

  viewCartBtn.addEventListener('click', () => {
    closeCartModal();
    popupOverlay.style.display = 'none'; // Product popup close karega
    redirectToCart(); // Cart page par redirect karega
  });

  // Close modal when clicking outside
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      closeCartModal();
    }
  });

  addToCartBtn.addEventListener('click', () => {
    const name = popupTitle.textContent;
    const image = popupImg.src;
    const description = popupDesc.textContent;

    const priceText = popupPrice.textContent;
    const price = parseInt(priceText.replace('Rs. ', '').trim());

    const quantity = parseInt(popupQty.value);
    const size = popupSize.value;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if same product + size already exists
    const existingIndex = cart.findIndex(item => item.name === name && item.size === size);
    if(existingIndex >= 0){
      cart[existingIndex].quantity += quantity;
      showCartModal(`${quantity} more ${size} ${name} added to cart! Total quantity: ${cart[existingIndex].quantity}`);
    } else {
      cart.push({ name, image, description, price, quantity, size });
      showCartModal(`${quantity} ${size} ${name} added to cart successfully!`);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  });
});
