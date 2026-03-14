document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    // Toggle sidebar on mobile
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('open');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Handle submenu toggles
    hasSubmenu.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('open');
        });
    });
    
    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('has-submenu')) {
                // Remove active class from all items
                menuItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Update page title
                const menuText = this.querySelector('.menu-text')?.textContent || 'Dashboard';
                document.querySelector('.page-title').textContent = menuText;
                
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
                
                // Simulate content change
                console.log(`Navigating to: ${menuText}`);
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
            // Add your search logic here
        });
    }
    
    // Notification clicks
    const notifications = document.querySelectorAll('.notification-icon');
    notifications.forEach(notif => {
        notif.addEventListener('click', function() {
            console.log('Notifications clicked');
            // Add your notification logic here
        });
    });
    
    // User dropdown (simplified)
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function() {
            console.log('User dropdown clicked');
            // Add your dropdown logic here
        });
    }
    
    // CTA Button
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            alert('Create new item!');
        });
    }
    
    // Simulate data updates
    function updateStats() {
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            const random = Math.floor(Math.random() * 5) + 1;
            badge.textContent = random;
        });
    }
    
    // Update stats every 30 seconds
    setInterval(updateStats, 30000);
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });
});