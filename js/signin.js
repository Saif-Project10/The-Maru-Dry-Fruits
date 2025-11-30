// signin.js - with custom modal

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signinForm");
  const modal = document.getElementById("customModal");
  const closeBtn = document.querySelector(".close-btn");
  const okBtn = document.querySelector(".modal-ok-btn");
  const successIcon = document.querySelector(".success-icon");
  const errorIcon = document.querySelector(".error-icon");
  const modalTitle = document.querySelector(".modal-title");
  const modalMessage = document.querySelector(".modal-message");

  // ✅ Regular Expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;

  // ✅ Show Modal Function
  function showModal(type, title, message) {
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
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Basic Validation with Modal
    if (!email || !password) {
      showModal('error', 'Missing Fields', 'Please fill in all fields!');
      return;
    }

    if (!emailRegex.test(email)) {
      showModal('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      showModal('error', 'Invalid Password', 'Password must be at least 6 characters long and include a number.');
      return;
    }

    // Get all registered users from Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user with matching email and password
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      showModal('success', 'Welcome Back!', 'Login successful!');
      
      // Save active user in Session Storage
      setActiveUser(validUser);

      console.log("Logged in user:", validUser);

      // Redirect to home page after modal close
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
      
    } else {
      showModal('error', 'Login Failed', 'Invalid email or password!');
      console.log("Login failed. No matching user found.");
    }
  });
});

// Save active user in session
function setActiveUser(user) {
  sessionStorage.setItem("activeUser", JSON.stringify(user));
}
