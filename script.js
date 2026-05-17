/* Mobile navigation toggle */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Close nav when a link is clicked */
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* Publication filter */
const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards   = document.querySelectorAll('.pub-card[data-year]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const year = btn.dataset.filter;
    pubCards.forEach(card => {
      const show = year === 'all' || card.dataset.year === year;
      card.style.display = show ? '' : 'none';
    });
  });
});

/* Animate counters in the hero on first scroll into view */
const stats = document.querySelectorAll('.stat-num[data-target]');

const countUp = el => {
  const target = +el.dataset.target;
  const duration = 1200;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(s => observer.observe(s));

/* Highlight active nav link on scroll */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--teal)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
