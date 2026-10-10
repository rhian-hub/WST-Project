//for nav
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

//for dropdown collapse
document.querySelectorAll('#navMenu a').forEach(a => {
  a.addEventListener('click', () => {
    bootstrap.Collapse.getOrCreateInstance('#navMenu').hide();
  });
});

//for team carousel
const section = document.querySelector(".team-page");
const track = section.querySelector(".carousel-track");
const windowEl = section.querySelector(".carousel-window");
const cards = [...section.querySelectorAll(".team-card")];
const dots = [...section.querySelectorAll(".dot")];
let activeIndex = 0;

function showMember(index) {
  activeIndex = (index + cards.length) % cards.length;

  cards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === activeIndex);
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeIndex;
    dot.classList.toggle("active", isActive);
    if (isActive) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });

  const cardWidth = cards[0].offsetWidth; // ignores the scale() transform
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const offset = activeIndex * (cardWidth + gap) + cardWidth / 2;
  track.style.transform = `translateX(${windowEl.clientWidth / 2 - offset}px)`;
}

section.querySelector(".previous").addEventListener("click", () => showMember(activeIndex - 1));
section.querySelector(".next").addEventListener("click", () => showMember(activeIndex + 1));
dots.forEach((dot, index) => dot.addEventListener("click", () => showMember(index)));
window.addEventListener("resize", () => showMember(activeIndex));

showMember(0);
setInterval(() => showMember(activeIndex + 1), 2500);