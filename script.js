// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Hover video play/pause on work cards
document.querySelectorAll('.work-card').forEach(card => {
  const video = card.querySelector('.work-video');
  if (!video) return;
  card.addEventListener('mouseenter', () => video.play());
  card.addEventListener('mouseleave', () => video.pause());
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');

const videoSources = [
  'https://player.vimeo.com/video/1180955964?autoplay=1&title=0&byline=0&portrait=0&dnt=1',
  'https://player.vimeo.com/video/1186017677?autoplay=1&title=0&byline=0&portrait=0&dnt=1',
  'https://player.vimeo.com/video/1180955914?autoplay=1&title=0&byline=0&portrait=0&dnt=1',
  'https://player.vimeo.com/video/1180955898?autoplay=1&title=0&byline=0&portrait=0&dnt=1'
];

document.querySelectorAll('.play-btn').forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxVideo.src = '';
    setTimeout(() => { lightboxVideo.src = videoSources[i]; }, 50);
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxVideo.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// --- LENIS SMOOTH SCROLL ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- GSAP SETUP ---
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- GSAP ANIMATIONS ---

// A. Hero Parallax
gsap.to('.hero-video', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 200,
  scale: 1.15
});

gsap.to('.hero-content', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: -150,
  opacity: 0
});

// B. Section Headers
gsap.utils.toArray('.section-header, .contact-box').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 50 }, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    opacity: 1, y: 0, duration: 1, ease: 'power2.out'
  });
});

// C. Portfolio Cards
gsap.utils.toArray('.work-card').forEach((card, i) => {
  gsap.fromTo(card, { opacity: 0, y: 100 }, {
    scrollTrigger: { trigger: card, start: 'top 90%' },
    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out'
  });
});

// D. Services Stagger
if(document.querySelector('.services-grid')) {
  gsap.fromTo('.service-item', { opacity: 0, y: 50 }, {
    scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
  });
}

// E. About Text Cinematic Reveal
function splitTextWords(elementId) {
    const el = document.getElementById(elementId);
    if(!el) return [];
    const words = el.innerText.split(' ');
    el.innerHTML = '';
    words.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        span.style.opacity = '0.2';
        span.style.transition = 'opacity 0.4s ease';
        el.appendChild(span);
    });
    return el.querySelectorAll('span');
}

const p1Words = splitTextWords('about-desc-1');
const p2Words = splitTextWords('about-desc-2');

if(p1Words.length > 0) {
    gsap.to(p1Words, {
        scrollTrigger: { trigger: '#about-desc-1', start: 'top 85%', end: 'bottom 60%', scrub: 1 },
        opacity: 1, stagger: 0.1, ease: 'power1.out'
    });
}
if(p2Words.length > 0) {
    gsap.to(p2Words, {
        scrollTrigger: { trigger: '#about-desc-2', start: 'top 85%', end: 'bottom 60%', scrub: 1 },
        opacity: 1, stagger: 0.1, ease: 'power1.out'
    });
}

// Stats fade
gsap.fromTo('.about-stat', { opacity: 0, x: 30 }, {
  scrollTrigger: { trigger: '.about-visual', start: 'top 80%' },
  opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power2.out'
});
