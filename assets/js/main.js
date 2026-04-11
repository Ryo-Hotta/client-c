/* ===================================================
   MAEDA COSMETICS — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Hero Swiper (Fade Carousel) ---
  const heroSwiper = new Swiper('.hero-swiper', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: true,
    speed: 1200,
    navigation: {
      nextEl: '.hero-next',
      prevEl: '.hero-prev',
    },
    on: {
      init: function () {
        updatePagination(this);
        startProgress(this);
      },
      slideChange: function () {
        updatePagination(this);
        startProgress(this);
      },
    },
  });

  function updatePagination(swiper) {
    const current = document.querySelector('.hero-current');
    const total = document.querySelector('.hero-total');
    if (current && total) {
      current.textContent = swiper.realIndex + 1;
      total.textContent = swiper.slides.length - 2; // loop duplicates
    }
  }

  function startProgress(swiper) {
    const bar = document.querySelector('.hero-progress-bar');
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      bar.style.transition = `width ${swiper.params.autoplay.delay}ms linear`;
      bar.style.width = '100%';
    });
  }

  // --- Gallery Swiper (Horizontal Scroll) ---
  new Swiper('.gallery-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: true,
    grabCursor: true,
  });

  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Hamburger Menu ---
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('fullscreenNav');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isOpen);
    nav.setAttribute('aria-hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close nav on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // --- Scroll Reveal (IntersectionObserver) ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Page Top Button ---
  const pageTop = document.getElementById('pageTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      pageTop.classList.add('visible');
    } else {
      pageTop.classList.remove('visible');
    }
  }, { passive: true });

  pageTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
