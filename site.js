const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Observe individual pieces so long sections do not finish animating offscreen.
// Keep text opaque and labels still: motion never gates access to the content.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const animations = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const item = entry.target;
      observer.unobserve(item);
      const section = item.closest('section');
      let from = 'translateY(56px)';
      let duration = 1100;
      if (section.id === 'focus') {
        from = item.matches('.focus-row') ? 'translateX(64px)' : 'translateY(-44px)';
      } else if (section.id === 'viewpoint') {
        from = item.matches('.viewpoint-mark') ? 'translate(12%, 14%) rotate(8deg)' : 'translateY(64px) rotate(1deg)';
        duration = 1350;
      } else if (section.id === 'approach') {
        from = 'perspective(1000px) rotateX(-9deg) translateY(48px)';
      } else if (section.id === 'impact') {
        from = 'translateY(64px) scale(.97)';
        duration = 1200;
      } else if (section.id === 'contact') {
        from = 'translateY(64px) scale(.95)';
        duration = 1250;
      }
      const animation = item.animate([
        { transform: from }, { transform: 'none' }
      ], { duration, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'none' });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
    }
  }, { threshold: 0, rootMargin: '0px 0px 50px 0px' });
  document.querySelectorAll('#about h2, #about .section-content > p, #about .facts > div, #focus h2, .focus-row, .statement, .thinking, .viewpoint-mark, #approach h2, #approach .lead, .principles article, #impact h2, .impact-story, #contact h2, .contact-copy, .contact-links').forEach(item => observer.observe(item));
  reducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
  });
}
