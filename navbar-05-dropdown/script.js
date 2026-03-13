// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Mobile dropdown toggle
const dropdowns = document.querySelectorAll('.menu li.dropdown > a');

dropdowns.forEach(drop => {
  drop.addEventListener('click', e => {
    if(window.innerWidth <= 768){
      e.preventDefault();
      const parent = drop.parentElement;
      parent.classList.toggle('show');
    }
  });
});
