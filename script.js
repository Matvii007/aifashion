document.addEventListener('DOMContentLoaded', () => {

    // ── NAVBAR SCROLL ──────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ── MOBILE MENU ────────────────────────────────────────────────
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => menu.classList.remove('open'));
    });

    // ── INTERSECTION OBSERVER: sections + stagger items ────────────
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(el => io.observe(el));

    // Stagger items get delayed based on index within their parent
    const staggerIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            // Find index among siblings
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.stagger'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 0.1}s`;
            entry.target.classList.add('visible');
            staggerIO.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.stagger').forEach(el => staggerIO.observe(el));

    // ── FAQ ACCORDION ──────────────────────────────────────────────
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            // Close all
            document.querySelectorAll('.faq-q').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.classList.remove('open');
            });
            // Toggle clicked
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                btn.nextElementSibling.classList.add('open');
            }
        });
    });

    // ── SMOOTH SCROLLING ───────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── HERO VIDEO (load silently) ─────────────────────────────────
    const video = document.querySelector('.hero-video');
    if (video) {
        video.addEventListener('canplay', () => video.classList.add('loaded'));
    }

});
