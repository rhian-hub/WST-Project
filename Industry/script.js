const nav = document.querySelector('nav');
const links = nav.querySelectorAll('a');
const indicator = nav.querySelector('.indicator');
let shown = false;

function show(link) {
  if (!shown) {
    indicator.style.transition = 'none';
    indicator.style.left = link.offsetLeft + 'px';
    indicator.style.width = link.offsetWidth + 'px';
    indicator.offsetWidth;              
    indicator.style.transition = '';
    shown = true;
  } else {
    indicator.style.left = link.offsetLeft + 'px';
    indicator.style.width = link.offsetWidth + 'px';
  }
  indicator.style.opacity = '1';
}

function hide() {
  indicator.style.opacity = '0';
  shown = false;
}

links.forEach(link => {
  link.addEventListener('mouseenter', () => show(link));
});

nav.addEventListener('mouseleave', hide);
window.addEventListener('resize', hide);