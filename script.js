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
        
        // Add staggering effect logic for grouped items (like cards)
        // We observe their parents and add delay to children when parent appears.
        const addStaggerDelays = () => {
             const grids = document.querySelectorAll('.cards-grid, .services-grid');
             grids.forEach(grid => {
                 const items = grid.querySelectorAll('.stagger-item');
                 items.forEach((item, index) => {
                     // Add inline transition delay for staggering
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
                if(targetId === '#') return;
                
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

    // Initialize all
    setupScrollAnimations();
    setupSmoothScrolling();
});
