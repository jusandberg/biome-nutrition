const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const whoTiles = [...document.querySelectorAll('.who-tile')];
const whoPanel = document.querySelector('.who-panel');

whoTiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    whoTiles.forEach((item) => item.setAttribute('aria-selected', String(item === tile)));
    if (!whoPanel) return;
    const icon = tile.querySelector('svg');
    const panelIcon = whoPanel.querySelector('.who-panel-icon');
    if (icon && panelIcon) panelIcon.innerHTML = icon.outerHTML;
    whoPanel.querySelector('h3').textContent = tile.dataset.title;
    whoPanel.querySelector('p').textContent = tile.dataset.description;
  });
});
