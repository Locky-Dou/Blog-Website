const modal = document.querySelector('.demo-modal');
const demoButtons = document.querySelectorAll('[data-demo]');
const closeButtons = document.querySelectorAll('[data-close]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

function openModal() {
  modal.hidden = false;
  document.body.classList.add('no-scroll');
}
function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('no-scroll');
}

demoButtons.forEach((button) => button.addEventListener('click', openModal));
closeButtons.forEach((button) => button.addEventListener('click', closeModal));
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('mobile-open', !isOpen);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('mobile-open');
  });
});

// Let the dashboard feel a little alive without becoming distracting.
const bars = document.querySelectorAll('.bar-col .bar');
const dashboard = document.querySelector('.signal-dashboard');
if (dashboard && 'IntersectionObserver' in window) {
  bars.forEach((bar) => {
    const height = bar.style.height;
    bar.style.height = '0%';
    bar.dataset.height = height;
  });
  const observer = new IntersectionObserver((entries, instance) => {
    if (entries[0].isIntersecting) {
      bars.forEach((bar, index) => {
        setTimeout(() => { bar.style.height = bar.dataset.height; }, index * 100);
      });
      instance.disconnect();
    }
  }, { threshold: 0.35 });
  observer.observe(dashboard);
}
