document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  const megaDropdowns = document.querySelectorAll('.mega-dropdown');
  const menuLinks = document.querySelectorAll('.menu a');
  const searchBtn = document.querySelector('.search-btn');
  const cartBtn = document.querySelector('.cart-btn');
  const ctaBtn = document.querySelector('.cta-btn');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    if (menu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Close all mega menus
      megaDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Handle mega dropdown on mobile
  if (window.innerWidth <= 768) {
    megaDropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other mega menus
        megaDropdowns.forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('active');
          }
        });
        
        dropdown.classList.toggle('active');
      });
    });
  }
  
  // Handle link clicks
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      menuLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      if (window.innerWidth <= 768) {
        menu.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      console.log(`Navigating to: ${this.textContent.trim()}`);
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const isClickInside = menu.contains(e.target) || hamburger.contains(e.target);
      
      if (!isClickInside) {
        menu.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
        
        megaDropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
      
      megaDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
      
      megaDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Button interactions
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      alert('Search functionality would open here');
    });
  }
  
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      alert('Shopping cart would open here');
    });
  }
  
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function() {
      alert('Sign in modal would open here');
    });
  }
  
  // Add animation on hover for desktop
  if (window.innerWidth > 768) {
    megaDropdowns.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', function() {
        this.classList.add('active');
      });
      
      dropdown.addEventListener('mouseleave', function() {
        this.classList.remove('active');
      });
    });
  }
  
  // Set active link based on current page
  const currentPath = window.location.pathname;
  menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});