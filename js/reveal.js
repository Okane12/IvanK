// Scroll-reveal: fades elements in as they enter the viewport.
// React calls window.runReveal() after each page render.
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
}

window.runReveal = () => setTimeout(initReveal, 80);
