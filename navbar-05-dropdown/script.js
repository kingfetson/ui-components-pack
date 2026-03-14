document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  const dropdowns = document.querySelectorAll('.dropdown');
  const menuLinks = document.querySelectorAll('.menu a');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    if (menu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Close all dropdowns when closing menu
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Handle dropdown clicks on mobile
  if (window.innerWidth <= 768) {
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns at same level
        const parent = dropdown.parentElement;
        const siblings = parent.querySelectorAll(':scope > .dropdown');
        
        siblings.forEach(sib => {
          if (sib !== dropdown) {
            sib.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      });
    });
  }
  
  // Handle desktop hover with keyboard support
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) {
        this.classList.add('active');
      }
    });
    
    dropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth > 768) {
        this.classList.remove('active');
      }
    });
    
    // Keyboard navigation
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const submenu = dropdown.querySelector('.submenu');
    
    if (toggle && submenu) {
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.toggle('active');
          
          // Focus first submenu item
          if (dropdown.classList.contains('active')) {
            const firstItem = submenu.querySelector('a');
            if (firstItem) firstItem.focus();
          }
        }
      });
      
      // Close with Escape
      submenu.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          dropdown.classList.remove('active');
          toggle.focus();
        }
      });
    }
  });
  
  // Handle link clicks
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't prevent default if it's a real link (not dropdown toggle)
      if (!this.classList.contains('dropdown-toggle')) {
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
        
        console.log(`Navigating to: ${this.textContent.trim()}`);
      }
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
        
        // Close all dropdowns
        dropdowns.forEach(dropdown => {
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
      
      // Reset dropdowns
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    } else {
      // Remove hover styles on mobile
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Escape key to close everything
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
      
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Set active link based on current page
  const currentPath = window.location.pathname;
  menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
  
  // CTA button
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function() {
      alert('Get started with our services!');
    });
  }
});