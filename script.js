document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Intersection Observer for scroll animations
    const setupScrollAnimations = () => {
        const fadeSections = document.querySelectorAll('.fade-in-section');
        const staggerItems = document.querySelectorAll('.stagger-item');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeSections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Add staggering effect only to service cards, NOT carousel cards
        // (carousel cards get transitionDelay added which makes later ones slow)
        const addStaggerDelays = () => {
            const grids = document.querySelectorAll('.services-grid');
            grids.forEach(grid => {
                const items = grid.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.15}s`;
                });
            });
        }

        addStaggerDelays();
    };

    // 2. Smooth scrolling for internal links
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };
    // 3. Carousel Logic
    const setupCarousel = () => {
        const track = document.querySelector('.carousel-track');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (!track || !prevBtn || !nextBtn) return;

        // Cache cards once instead of querying DOM on every scroll event
        const cards = Array.from(track.querySelectorAll('.visual-card'));
        let isUpdating = false; // Throttle flag for requestAnimationFrame

        const updateActiveCard = () => {
            isUpdating = false; // Reset flag
            const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 2;
            let closestCard = null;
            let minDistance = Infinity;

            cards.forEach(card => {
                const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
                const distance = Math.abs(trackCenter - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });

            cards.forEach(card => card.classList.remove('active'));
            if (closestCard) closestCard.classList.add('active');
        };

        // Passive listener: lets the browser scroll without waiting for JS
        track.addEventListener('scroll', () => {
            if (!isUpdating) {
                isUpdating = true;
                window.requestAnimationFrame(updateActiveCard);
            }
        }, { passive: true });

        // Initial setup
        updateActiveCard();

        const getScrollAmount = () => {
            const card = track.querySelector('.visual-card');
            if (!card) return 0;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            return card.offsetWidth + gap;
        };

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    };

    // Initialize all
    setupScrollAnimations();
    setupSmoothScrolling();
    setupCarousel();
});
