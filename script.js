/* ─── Custom Cursor ─────────────────────────────────────────────────── */
(function () {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = -100, my = -100, fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; follower.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; follower.style.opacity = '1'; });
})();

/* ─── Nav scroll state ──────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

/* ─── Mobile menu ───────────────────────────────────────────────────── */
(function () {
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

/* ─── Scroll Reveal ─────────────────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-word, .reveal-card').forEach(el => io.observe(el));
})();

/* ─── Hero parallax on scroll ───────────────────────────────────────── */
(function () {
  const title = document.querySelector('.hero__title');
  if (!title) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      title.style.transform = `translateY(${y * 0.18}px)`;
      title.style.opacity   = 1 - (y / window.innerHeight) * 1.2;
    }
  }, { passive: true });
})();

/* ─── Work card: magnetic hover ─────────────────────────────────────── */
(function () {
  document.querySelectorAll('.work-card__link').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width  * 8;
      const dy = (e.clientY - cy) / rect.height * 8;
      card.style.transform = `perspective(800px) rotateY(${dx}deg) rotateX(${-dy}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.3s';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear, border-color 0.3s';
    });
  });
})();

/* ─── Typed / character counter in hero tag ─────────────────────────── */
(function () {
  const tag = document.querySelector('.hero__tag');
  if (!tag) return;

  const messages = [
    'Available for freelance',
    'Open to collaborations',
    '6+ years of experience',
  ];
  let msgIdx = 0, charIdx = 0, deleting = false;
  let textNode = null;

  tag.childNodes.forEach(n => { if (n.nodeType === 3 && n.textContent.trim()) textNode = n; });
  if (!textNode) return;

  function tick() {
    const target = messages[msgIdx];
    if (!deleting) {
      charIdx++;
      textNode.textContent = ' ' + target.slice(0, charIdx);
      if (charIdx === target.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
    } else {
      charIdx--;
      textNode.textContent = ' ' + target.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        msgIdx = (msgIdx + 1) % messages.length;
        setTimeout(tick, 300);
        return;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }
  setTimeout(tick, 1800);
})();

/* ─── Smooth scroll for anchor links ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
