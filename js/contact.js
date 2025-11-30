
// contact.js — with regex validation + custom modal

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("customModal");
  const closeBtn = document.querySelector(".close-btn");
  const okBtn = document.querySelector(".modal-ok-btn");
  const successIcon = document.querySelector(".success-icon");
  const errorIcon = document.querySelector(".error-icon");
  const modalTitle = document.querySelector(".modal-title");
  const modalMessage = document.querySelector(".modal-message");

  // ✅ Regular Expressions
  const nameRegex = /^[A-Za-z\s]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[0-9]{11}$/;

  // ✅ Show Modal Function
  function showModal(type, title, message) {
    // Reset icons
    successIcon.style.display = 'none';
    errorIcon.style.display = 'none';
    
    if (type === 'success') {
      successIcon.style.display = 'block';
      modalTitle.textContent = title;
      modalMessage.textContent = message;
    } else {
      errorIcon.style.display = 'block';
      modalTitle.textContent = title;
      modalMessage.textContent = message;
    }
    
    modal.style.display = 'block';
  }

  // ✅ Close Modal Functions
  function closeModal() {
    modal.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeModal);
  okBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // ✅ Form Submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();

    // ✅ Validation with Modal
    if (!nameRegex.test(name)) {
      showModal('error', 'Invalid Name', 'Please enter a valid full name (only letters, 3–30 characters).');
      return;
    }

    if (!emailRegex.test(email)) {
      showModal('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(number)) {
      showModal('error', 'Invalid Phone', 'Please enter a valid 11-digit phone number.');
      return;
    }

    if (message.length < 5) {
      showModal('error', 'Message Too Short', 'Message must be at least 5 characters long.');
      return;
    }

    // ✅ Save to Local Storage
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userNumber", number);
    localStorage.setItem("userMessage", message);

    // ✅ Save to Session Storage
    sessionStorage.setItem(
      "sessionUser",
      JSON.stringify({ name, email, number, message })
    );

    // ✅ Success Modal
    showModal('success', 'Success!', 'Data saved successfully in Local & Session Storage!');

    // Reset form after successful submission
    setTimeout(() => {
      form.reset();
    }, 1000);
  });

  // ✅ Load saved data when page loads
  window.addEventListener("load", function () {
    document.getElementById("name").value = localStorage.getItem("userName") || "";
    document.getElementById("email").value = localStorage.getItem("userEmail") || "";
    document.getElementById("number").value = localStorage.getItem("userNumber") || "";
    document.getElementById("message").value = localStorage.getItem("userMessage") || "";
  });
});
