document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            
            // Update active state
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });
    
    // Notification badge interactions
    const markReadButtons = document.querySelectorAll('.mark-read');
    markReadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.closest('.notification-dropdown');
            const unreadItems = dropdown.querySelectorAll('.unread');
            const badge = document.querySelector(`[data-target="${dropdown.id}"] .badge`);
            
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            if (badge) {
                badge.style.opacity = '0';
                setTimeout(() => {
                    badge.textContent = '0';
                    badge.style.opacity = '1';
                }, 300);
            }
        });
    });
    
    // Simulate new notification (demo)
    setInterval(() => {
        const alertBadge = document.querySelector('.alert-badge');
        if (alertBadge) {
            const currentCount = parseInt(alertBadge.textContent);
            if (currentCount < 9) {
                alertBadge.textContent = currentCount + 1;
                alertBadge.classList.add('pulse');
                
                // Remove pulse after animation
                setTimeout(() => {
                    alertBadge.classList.remove('pulse');
                }, 2000);
            }
        }
    }, 10000); // Every 10 seconds
    
    // Handle notification icon clicks (prevent dropdown toggle on mobile)
    const notificationIcons = document.querySelectorAll('.notification-icon');
    notificationIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.nextElementSibling.nextElementSibling;
                if (dropdown && dropdown.classList.contains('notification-dropdown')) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });
    
    // Profile dropdown interactions
    const profileLinks = document.querySelectorAll('.profile-link');
    profileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Navigating to: ${this.textContent.trim()}`);
        });
    });
});