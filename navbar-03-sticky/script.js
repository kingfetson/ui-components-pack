document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.menu a');
  const themeToggle = document.getElementById('themeToggle');
  const sections = document.querySelectorAll('.section');
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);
  
  let lastScroll = 0;
  let isScrolled = false;
  let isAtTop = true;
  
  // Scroll event handler
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Update progress bar
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (currentScroll / windowHeight) * 100;
    progressBar.style.width = progress + '%';
    
    // Check if at top
    if (currentScroll <= 50) {
      isAtTop = true;
      navbar.classList.add('at-top');
      navbar.classList.remove('scrolled', 'hidden');
    } else {
      isAtTop = false;
      navbar.classList.remove('at-top');
      navbar.classList.add('scrolled');
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
      } else {
        // Scrolling up
        navbar.classList.remove('hidden');
      }
    }
    
    // Update active menu based on scroll position
    updateActiveMenu();
    
    lastScroll = currentScroll;
  });
  
  // Update active menu item based on scroll position
  function updateActiveMenu() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Mobile menu toggle
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
  
  // Handle menu link clicks
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
      
      // Smooth scroll to section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
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
  
  // Theme toggle
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Escape key to close menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      menu.classList.remove('show');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Initial check for at top
  if (window.pageYOffset <= 50) {
    navbar.classList.add('at-top');
  }
});