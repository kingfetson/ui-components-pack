document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    
    // Toggle menu on hamburger click
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
            
            // Close mobile menu if open
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Simulate navigation
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
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
    
    // Style switcher functionality (optional)
    const styleButtons = document.querySelectorAll('.style-btn');
    const menuElement = document.querySelector('.menu');
    
    if (styleButtons.length) {
        styleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove all style classes
                menuElement.className = 'menu';
                
                // Add selected style class
                const style = this.getAttribute('data-style');
                menuElement.classList.add(`style-${style}`);
                
                // Update active button
                styleButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Set active link based on current page (for demo)
    // You can modify this based on your actual routing
    const currentPath = window.location.pathname;
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Add smooth scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});