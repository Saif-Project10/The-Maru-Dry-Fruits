// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const logoutBtn = document.getElementById("logoutBtn");
  
    // Get active user from session storage
    const activeUser = getActiveUser();
  
    if (!activeUser) {
      // If no active session, redirect to sign-in page
      alert("Please sign in to access your dashboard.");
      window.location.href = "signin.html";
      return;
    }
  
    // Show personalized welcome
    welcomeMessage.textContent = `Welcome, ${activeUser.name}!`;
  
    // Logout event
    logoutBtn.addEventListener("click", function () {
      logoutUser();
      alert("You have been logged out successfully!");
      window.location.href = "signin.html";
    });
  });
  