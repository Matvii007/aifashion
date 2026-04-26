// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Note: Hover video play/pause removed because Vimeo iframes do not support direct HTML5 video.play() smoothly without API loading.

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

// C. Cinematic Editorial Rows
gsap.utils.toArray('.editorial-row').forEach((row, i) => {
  // Main row fade & slide
  gsap.fromTo(row, { opacity: 0, y: 150 }, {
    scrollTrigger: { trigger: row, start: 'top 85%' },
    opacity: 1, y: 0, duration: 1.4, ease: 'power3.out'
  });

  // Number Parallax
  const num = row.querySelector('.ed-num');
  if(num) {
    gsap.fromTo(num, { y: -150 }, {
      scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
      y: 150, ease: 'none'
    });
  }

  // Video Media inner parallax zoom
  const mediaWrap = row.querySelector('.ed-media');
  const video = row.querySelector('.work-video');
  if(mediaWrap && video) {
    gsap.fromTo(video, { scale: 1.4, y: -50 }, {
      scrollTrigger: { trigger: mediaWrap, start: 'top bottom', end: 'bottom top', scrub: true },
      scale: 1, y: 50, ease: 'none'
    });
  }
});

// D. Services Stagger
if(document.querySelector('.services-grid')) {
  gsap.fromTo('.service-item', { opacity: 0, y: 100 }, {
    scrollTrigger: { trigger: '.services-grid', start: 'top 75%' },
    opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out'
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

// F. Stats Heavy Fade & Slide
gsap.utils.toArray('.about-stat').forEach((stat, i) => {
  const num = stat.querySelector('.stat-num');
  if(num) {
    gsap.fromTo(num, { opacity: 0, y: 50, scale: 0.9 }, {
      scrollTrigger: { trigger: stat, start: 'top 85%' },
      opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out'
    });
  }
});
