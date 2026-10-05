/* =========================================================
   Vivada Proyect — interacciones
   ========================================================= */
(function () {
  'use strict';

  // Marca que JS está activo (los estilos .reveal solo se aplican con JS)
  document.documentElement.classList.add('js');

  /* ---------- Menú hamburguesa ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  // Cierra al elegir un enlace
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  // Cierra con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Sombra del navbar al hacer scroll ---------- */
  var navbar = document.getElementById('navbar');
  function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Animación fade-up con IntersectionObserver ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el, i) {
      // Pequeño escalonado entre tarjetas hermanas
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- "Solicitar demo": abre WhatsApp con mensaje específico ---------- */
  var demo = document.querySelector('[data-demo]');
  var wa = document.getElementById('waBtn');
  if (demo && wa) {
    demo.addEventListener('click', function () {
      wa.href = 'https://wa.me/542494531999?text=' +
        encodeURIComponent('Hola Vivada Proyect, quiero solicitar una demo del sistema para nutricionista.');
    });
  }
})();
