document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  const overlay = document.getElementById('menuOverlay');
  const menuLinks = document.querySelectorAll('.menu a');
  const body = document.body;
  
  // Create overlay if it doesn't exist
  if (!overlay) {
    const newOverlay = document.createElement('div');
    newOverlay.className = 'menu-overlay';
    newOverlay.id = 'menuOverlay';
    document.body.appendChild(newOverlay);
  }
  
  const menuOverlay = document.getElementById('menuOverlay');
  
  // Toggle menu function
  function toggleMenu(show) {
    if (show === undefined) {
      // Toggle
      menu.classList.toggle('show');
      hamburger.classList.toggle('active');
      menuOverlay.classList.toggle('active');
    } else {
      // Set specific state
      if (show) {
        menu.classList.add('show');
        hamburger.classList.add('active');
        menuOverlay.classList.add('active');
      } else {
        menu.classList.remove('show');
        hamburger.classList.remove('active');
        menuOverlay.classList.remove('active');
      }
    }
    
    // Prevent body scroll when menu is open
    if (menu.classList.contains('show')) {
      body.classList.add('menu-open');
      body.style.overflow = 'hidden';
    } else {
      body.classList.remove('menu-open');
      body.style.overflow = '';
    }
  }
  
  // Hamburger click
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });
  
  // Overlay click
  menuOverlay.addEventListener('click', function() {
    toggleMenu(false);
  });
  
  // Menu link clicks
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      menuLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Close menu
      toggleMenu(false);
      
      console.log(`Navigating to: ${this.textContent.trim()}`);
    });
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('show')) {
      toggleMenu(false);
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      toggleMenu(false);
    }
  });
  
  // Mobile CTA button
  const mobileCta = document.querySelector('.mobile-cta');
  if (mobileCta) {
    mobileCta.addEventListener('click', function() {
      alert('Sign out clicked');
      toggleMenu(false);
    });
  }
  
  // Add touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    // Swipe right to close menu (if menu is open)
    if (menu.classList.contains('show') && touchEndX - touchStartX > 50) {
      toggleMenu(false);
    }
    
    // Swipe left to open menu (from left edge)
    if (!menu.classList.contains('show') && touchStartX < 30 && touchStartX - touchEndX > 50) {
      toggleMenu(true);
    }
  }
  
  // Add active class based on current page
  const currentPath = window.location.pathname;
  menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
  
  // Log menu state for debugging
  console.log('Hamburger menu initialized');
});