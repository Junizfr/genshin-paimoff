const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinksItems.forEach((link) => {
  link.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
    burgerMenu.classList.remove('active');
    navLinks.classList.remove('active');
  }
});
