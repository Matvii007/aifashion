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
  'https://player.vimeo.com/video/1180955939?autoplay=1&title=0&byline=0&portrait=0&dnt=1',
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

// Reveal on scroll (Intersection Observer)
const reveals = document.querySelectorAll('.work-card, .service-item, .about-stat, .section-header, .contact-box');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));
