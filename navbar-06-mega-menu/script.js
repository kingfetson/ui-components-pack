// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Mobile mega menu toggle
const megaDropdowns = document.querySelectorAll('.mega-dropdown > a');

megaDropdowns.forEach(drop => {
  drop.addEventListener('click', e => {
    if(window.innerWidth <= 768){
      e.preventDefault();
      drop.nextElementSibling.classList.toggle('show');
    }
  });
});
