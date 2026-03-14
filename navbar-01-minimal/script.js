document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.menu a');
  const navbar = document.querySelector('.navbar');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    if (menu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Handle link clicks
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      menuLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Close mobile menu
      if (window.innerWidth <= 768) {
        menu.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Optional: Smooth scroll to section
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Escape key to close menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('show')) {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Set active link based on current page
  const currentPath = window.location.pathname;
  menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});