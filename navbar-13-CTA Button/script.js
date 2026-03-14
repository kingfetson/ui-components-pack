document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const ctaBtn = document.querySelector('.cta-btn');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('show');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (menu.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
            
            // Add mobile CTA if it doesn't exist
            if (!document.querySelector('.mobile-cta')) {
                const mobileCTA = document.createElement('a');
                mobileCTA.href = '#';
                mobileCTA.className = 'mobile-cta';
                mobileCTA.textContent = 'Start Free Trial →';
                menu.appendChild(mobileCTA);
                
                mobileCTA.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Trial started! (Demo)');
                    menu.classList.remove('show');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        } else {
            document.body.style.overflow = '';
            // Remove mobile CTA when closing
            const mobileCTA = document.querySelector('.mobile-cta');
            if (mobileCTA) mobileCTA.remove();
        }
    });
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            
            // Remove mobile CTA
            const mobileCTA = document.querySelector('.mobile-cta');
            if (mobileCTA) mobileCTA.remove();
            
            // Set active state
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Simulate navigation (for demo)
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            
            // Remove mobile CTA
            const mobileCTA = document.querySelector('.mobile-cta');
            if (mobileCTA) mobileCTA.remove();
        }
    });
    
    // CTA button click handler
    ctaBtn.addEventListener('click', function() {
        alert('🎉 Starting your free trial! (Demo)');
        
        // Add a little animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
    
    // Add keyboard support (Escape to close menu)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('show')) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            
            const mobileCTA = document.querySelector('.mobile-cta');
            if (mobileCTA) mobileCTA.remove();
        }
    });
    
    // Track CTA visibility for analytics (optional)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('CTA button is visible');
            }
        });
    });
    
    observer.observe(ctaBtn);
});