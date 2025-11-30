
// signup.js - with custom modal

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const modal = document.getElementById("customModal");
  const closeBtn = document.querySelector(".close-btn");
  const okBtn = document.querySelector(".modal-ok-btn");
  const successIcon = document.querySelector(".success-icon");
  const errorIcon = document.querySelector(".error-icon");
  const modalTitle = document.querySelector(".modal-title");
  const modalMessage = document.querySelector(".modal-message");

  // ✅ Regular Expressions
  const nameRegex = /^[A-Za-z\s]{3,20}$/;
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

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validation Checks with Modal
    if (!name || !email || !password || !confirmPassword) {
      showModal('error', 'Missing Fields', 'Please fill in all fields!');
      return;
    }

    if (!nameRegex.test(name)) {
      showModal('error', 'Invalid Name', 'Name must be 3–20 letters and contain only alphabets.');
      return;
    }

    if (!emailRegex.test(email)) {
      showModal('error', 'Invalid Email', 'Please enter a valid email (e.g., name@example.com).');
      return;
    }

    if (!passwordRegex.test(password)) {
      showModal('error', 'Weak Password', 'Password must be at least 6 characters long and include a number.');
      return;
    }

    if (password !== confirmPassword) {
      showModal('error', 'Password Mismatch', 'Passwords do not match!');
      return;
    }

    // Save user in local storage
    const saveResult = saveUserToLocal(name, email, password);
    
    if (saveResult === 'duplicate') {
      showModal('error', 'Email Exists', 'This email is already registered! Please sign in.');
      return;
    }

    showModal('success', 'Success!', 'Signup successful! Your account has been created.');
    console.log("User registered:", { name, email });

    // Reset form after successful submission
    setTimeout(() => {
      form.reset();
      // Redirect to Sign In page
      window.location.href = "signin.html";
    }, 2000);
  });
});

// Function to save user data
function saveUserToLocal(name, email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent duplicate email
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return 'duplicate';
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  return 'success';
}
