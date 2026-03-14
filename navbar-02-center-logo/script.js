document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const leftMenu = document.querySelector('.left-menu');
  const rightMenu = document.querySelector('.right-menu');
  const allMenuLinks = document.querySelectorAll('.menu a');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Toggle both menus
    leftMenu.classList.toggle('show');
    rightMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    if (leftMenu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Handle link clicks
  allMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      allMenuLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Close mobile menu
      if (window.innerWidth <= 768) {
        leftMenu.classList.remove('show');
        rightMenu.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Optional: Show which link was clicked
      console.log(`Navigating to: ${this.textContent}`);
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!leftMenu.contains(e.target) && !rightMenu.contains(e.target) && !hamburger.contains(e.target)) {
        leftMenu.classList.remove('show');
        rightMenu.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      leftMenu.classList.remove('show');
      rightMenu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Escape key to close menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      leftMenu.classList.remove('show');
      rightMenu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Add scroll effect to navbar
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
  });
});