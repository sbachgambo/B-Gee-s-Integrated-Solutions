/* =================================================================
   B-Gee's Integrated Solutions — Interaction & Motion Engine
================================================================= */
(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var pl = document.querySelector('.preloader');
    if (pl) setTimeout(function () { pl.classList.add('hidden'); }, 450);
  });

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Scroll progress + header state + back-to-top ---------- */
    var header = document.querySelector('.site-header');
    var progress = document.querySelector('.scroll-progress');
    var backTop = document.querySelector('.back-to-top');

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      if (header) header.classList.toggle('scrolled', y > 40);
      if (backTop) backTop.classList.toggle('show', y > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backTop) backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- Mobile menu ---------- */
    var toggle = document.getElementById('mobileToggle');
    var navMenu = document.getElementById('navMenu');
    if (toggle && navMenu) {
      toggle.addEventListener('click', function () {
        var open = navMenu.classList.toggle('active');
        toggle.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = open ? 'hidden' : '';
      });
      navMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navMenu.classList.remove('active');
          toggle.innerHTML = '<i class="fas fa-bars"></i>';
          document.body.style.overflow = '';
        });
      });
    }

    /* ---------- Active nav link by current page ---------- */
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path || (path === 'index.html' && href === 'index.html')) a.classList.add('active');
    });

    /* ---------- Scroll reveal ---------- */
    var reveals = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Animated counters ---------- */
    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1600, start = null;
      var decimals = (target % 1 !== 0) ? 1 : 0;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }

    /* ---------- Testimonial carousel ---------- */
    var track = document.querySelector('.testi-track');
    if (track) {
      var cards = track.querySelectorAll('.testimonial-card');
      var navWrap = document.querySelector('.testi-nav');
      var index = 0, autoplay;

      function perView() {
        if (window.innerWidth <= 560) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
      }
      function maxIndex() { return Math.max(0, cards.length - perView()); }

      function buildDots() {
        if (!navWrap) return;
        navWrap.innerHTML = '';
        for (var i = 0; i <= maxIndex(); i++) {
          var b = document.createElement('button');
          b.className = 'testi-dot' + (i === index ? ' active' : '');
          b.setAttribute('aria-label', 'Go to testimonial group ' + (i + 1));
          (function (n) { b.addEventListener('click', function () { go(n); restart(); }); })(i);
          navWrap.appendChild(b);
        }
      }
      function go(n) {
        index = Math.max(0, Math.min(n, maxIndex()));
        var card = cards[0];
        var style = getComputedStyle(card);
        var gap = parseFloat(style.marginRight) || 30;
        var shift = (card.offsetWidth + gap) * index;
        track.style.transform = 'translateX(-' + shift + 'px)';
        if (navWrap) navWrap.querySelectorAll('.testi-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === index);
        });
      }
      function next() { index = index >= maxIndex() ? 0 : index + 1; go(index); }
      function restart() { clearInterval(autoplay); autoplay = setInterval(next, 5000); }

      buildDots(); go(0); restart();
      window.addEventListener('resize', function () { buildDots(); go(Math.min(index, maxIndex())); });
      track.addEventListener('mouseenter', function () { clearInterval(autoplay); });
      track.addEventListener('mouseleave', restart);
    }

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq-item');
        var ans = item.querySelector('.faq-a');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (o) {
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    });

    /* ---------- Portfolio filter ---------- */
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(function (item) {
          var show = (filter === 'all' || item.dataset.category === filter);
          if (show) {
            item.style.display = '';
            item.style.animation = 'pop .5s var(--ease)';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    /* ---------- Blog modal ---------- */
    var modal = document.getElementById('blogModal');
    if (modal) {
      var mTitle = modal.querySelector('#modalTitle');
      var mMeta = modal.querySelector('#modalMeta');
      var mBody = modal.querySelector('#modalBody');
      window.showBlogPost = function (title, meta, content) {
        mTitle.textContent = title;
        if (mMeta) mMeta.textContent = meta || '';
        mBody.innerHTML = (content || '').split('\n').map(function (p) {
          return p.trim() ? '<p>' + p.trim() + '</p>' : '';
        }).join('');
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      };
      function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
      modal.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    }

    /* ---------- Toast ---------- */
    function toast(title, msg) {
      var wrap = document.querySelector('.toast-wrap');
      if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
      var t = document.createElement('div');
      t.className = 'toast success';
      t.innerHTML = '<i class="fas fa-circle-check"></i><div><b>' + title + '</b><small>' + msg + '</small></div>';
      wrap.appendChild(t);
      requestAnimationFrame(function () { t.classList.add('show'); });
      setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 500); }, 4200);
    }

    /* ---------- Forms ---------- */
    function handleForm(e, kind) {
      e.preventDefault();
      var form = e.target;
      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; }
      setTimeout(function () {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
        form.reset();
        if (kind === 'quote') toast('Quote request received!', "We'll respond within 24 hours.");
        else if (kind === 'newsletter') toast('Subscribed!', "You're on the B-Gee's insider list.");
        else toast('Message sent!', "Thanks for reaching out — we'll be in touch.");
      }, 1100);
      return false;
    }
    var quoteForm = document.getElementById('quoteForm');
    if (quoteForm) quoteForm.addEventListener('submit', function (e) { handleForm(e, 'quote'); });
    var contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.addEventListener('submit', function (e) { handleForm(e, 'contact'); });
    var newsForm = document.getElementById('newsForm');
    if (newsForm) newsForm.addEventListener('submit', function (e) { handleForm(e, 'newsletter'); });

    /* ---------- Year ---------- */
    document.querySelectorAll('.js-year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* ---------- Subtle hero parallax on pointer ---------- */
    var hero = document.querySelector('.hero');
    if (hero && window.matchMedia('(min-width: 992px)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var shapes = hero.querySelectorAll('.hero-shape');
      hero.addEventListener('mousemove', function (e) {
        var cx = (e.clientX / window.innerWidth - 0.5);
        var cy = (e.clientY / window.innerHeight - 0.5);
        shapes.forEach(function (s, i) {
          var depth = (i + 1) * 18;
          s.style.transform = 'translate(' + (cx * depth) + 'px,' + (cy * depth) + 'px)';
        });
      });
    }

  });
})();
