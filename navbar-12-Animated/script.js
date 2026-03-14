document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('show');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
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
            
            // Show which link was clicked
            console.log(`Navigating to: ${this.textContent}`);
            
            // Optional: Show alert for demo
            alert(`You clicked on ${this.textContent}`);
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
    
    // Close menu on escape key
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
});

// Logo click animation
const logo = document.querySelector('.logo');
logo.addEventListener('click', function() {
    this.style.animation = 'hoverSpin 0.8s ease';
    setTimeout(() => {
        this.style.animation = '';
    }, 800);
});