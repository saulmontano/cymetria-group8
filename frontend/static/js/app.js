function toggleNav() {
  const navMenu = document.querySelector('.menu-principal');
  const navBtn = document.querySelector('.menu-btn');

  navMenu.classList.toggle('active');
  navBtn.classList.toggle('active');
}

document.querySelector('.menu-btn').addEventListener('click', toggleNav);
