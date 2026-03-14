document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link (optional)
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
        });
    });
});