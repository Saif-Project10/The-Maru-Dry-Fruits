// nav.js - Load navbar with hamburger functionality
fetch('nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    
    // Initialize hamburger menu after loading
    initializeHamburgerMenu();
  })
  .catch(error => console.error('Navbar load error:', error));

// Hamburger Menu Functionality
function initializeHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const accountItems = document.querySelectorAll('.account');

  if (hamburger && navLinks) {
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on links (mobile)
    navLinks.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    // Mobile dropdown functionality
    accountItems.forEach(item => {
      const link = item.querySelector('a');
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('active');
        }
      });
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
        if (!e.target.closest('.navbar')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          accountItems.forEach(item => item.classList.remove('active'));
        }
      }
    });
  }
}