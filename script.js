const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('.reveal');
const faqItems = document.querySelectorAll('.faq-item');
const messageBubbles = document.querySelectorAll('.message-bubble');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    faqItems.forEach((faq) => faq.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

let messageIndex = 0;
function revealMessages() {
  if (messageIndex >= messageBubbles.length) return;
  messageBubbles[messageIndex].classList.add('is-visible');
  messageIndex += 1;
  setTimeout(revealMessages, 550);
}
window.addEventListener('load', () => setTimeout(revealMessages, 400));
