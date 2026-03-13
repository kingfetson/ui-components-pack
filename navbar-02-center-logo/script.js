// Toggle menu for mobile
const hamburger = document.getElementById('hamburger');
const menus = document.querySelectorAll('.menu');

hamburger.addEventListener('click', () => {
  menus.forEach(menu => menu.classList.toggle('show'));
});
