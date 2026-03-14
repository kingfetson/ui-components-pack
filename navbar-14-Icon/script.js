document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    const ctaBtn = document.querySelector('.cta-btn');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('show');
        hamburger.classList.toggle('active');
        
        if (menu.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
            addMobileCTA();
        } else {
            document.body.style.overflow = '';
            removeMobileCTA();
        }
    });
    
    // Add mobile CTA
    function addMobileCTA() {
        if (!document.querySelector('.mobile-cta')) {
            const mobileCTA = document.createElement('a');
            mobileCTA.href = '#';
            mobileCTA.className = 'mobile-cta';
            mobileCTA.innerHTML = '<span class="icon">🚀</span> Get Started <span class="icon">→</span>';
            menu.appendChild(mobileCTA);
            
            mobileCTA.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Getting started! 🚀');
                menu.classList.remove('show');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
                this.remove();
            });
        }
    }
    
    function removeMobileCTA() {
        const mobileCTA = document.querySelector('.mobile-cta');
        if (mobileCTA) mobileCTA.remove();
    }
    
    // Handle link clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            menuLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Animate the icon
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.style.animation = 'bounce 0.5s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            }
            
            // Close mobile menu if open
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
                removeMobileCTA();
            }
            
            // Simulate navigation
            console.log(`Navigating to: ${this.textContent.trim()}`);
        });
        
        // Add hover effect for tooltips
        const text = link.textContent.trim();
        link.setAttribute('data-tooltip', text);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            removeMobileCTA();
        }
    });
    
    // Escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('show')) {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            removeMobileCTA();
        }
    });
    
    // CTA button click handler
    ctaBtn.addEventListener('click', function() {
        const btnIcon = this.querySelector('.btn-icon');
        
        // Animate button
        this.style.transform = 'scale(0.95)';
        if (btnIcon) {
            btnIcon.style.transform = 'translateX(10px)';
        }
        
        setTimeout(() => {
            this.style.transform = '';
            if (btnIcon) {
                btnIcon.style.transform = '';
            }
            alert('🎉 Welcome aboard! Check your email for next steps.');
        }, 200);
    });
    
    // Add random icon effects on hover
    menuLinks.forEach((link, index) => {
        const effects = ['bounce', 'wiggle', 'spin'];
        const effect = effects[index % effects.length];
        link.setAttribute('data-effect', effect);
    });
    
    // Intersection Observer for icon animations
    const iconCards = document.querySelectorAll('.icon-card');
    if (iconCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        iconCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
    }
});