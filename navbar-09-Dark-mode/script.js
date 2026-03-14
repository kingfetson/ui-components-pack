document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    const menuLinks = document.querySelectorAll('.menu a');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeSwitch.checked = false;
    }
    
    // Theme toggle functionality
    themeSwitch.addEventListener('change', function(e) {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Optional: Auto-switch based on time
    function setThemeBasedOnTime() {
        const hour = new Date().getHours();
        if (hour >= 19 || hour <= 6) {
            // Night time (7 PM to 6 AM)
            body.classList.add('dark-mode');
            themeSwitch.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            // Day time
            if (!localStorage.getItem('theme')) {
                body.classList.remove('dark-mode');
                themeSwitch.checked = false;
            }
        }
    }
    
    // Uncomment the next line to enable auto-switch
    // setThemeBasedOnTime();
    
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
            
            console.log(`Navigating to: ${this.textContent}`);
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
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // CTA button click handler
    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', function() {
        alert('Welcome! Theme is ' + (body.classList.contains('dark-mode') ? 'Dark' : 'Light'));
    });
    
    // Hero CTA button
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function() {
            alert('Explore our features in ' + (body.classList.contains('dark-mode') ? 'Dark' : 'Light') + ' mode!');
        });
    }
    
    // Escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('show')) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});