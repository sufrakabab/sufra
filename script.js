// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            const isExpanded = !isHidden;
            menuButton.setAttribute('aria-expanded', String(isExpanded));
            mobileMenu.setAttribute('aria-hidden', String(!isExpanded));
        });

        // Close mobile menu when a navigation link inside it is clicked
        const mobileNavLinks = mobileMenu.querySelectorAll('a.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Intersection Observer for Nav Highlighting & Animations ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a.nav-link');
    const mobileNavLinksQuery = '#mobile-menu a.nav-link';

    // Target cards and key sections for entrance animation
    const elementsToAnimate = document.querySelectorAll(`
        #about .text-column,
        #services .grid > div,
        #menu .grid > div,
        #contact .max-w-3xl
    `);

    // Prepare animated elements
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-target');
    });

    // Run observer only when sections exist on the page
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0.1, 0.35]
        };

        const observer = new IntersectionObserver((entries) => {
            let topIntersectingSectionId = null;

            entries.forEach(entry => {
                const targetElement = entry.target;

                // Trigger scroll animation
                if (targetElement.classList.contains('animate-target') && entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                    targetElement.classList.add('is-visible', 'animate-fadeInUp');
                }

                // Section highlight check
                if (targetElement.tagName === 'SECTION' && targetElement.hasAttribute('id')) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                        const currentBest = document.getElementById(topIntersectingSectionId);
                        if (!topIntersectingSectionId || (currentBest && targetElement.offsetTop < currentBest.offsetTop)) {
                            topIntersectingSectionId = targetElement.getAttribute('id');
                        }
                    }
                }
            });

            // Update active nav link
            if (topIntersectingSectionId) {
                navLinks.forEach(link => {
                    link.classList.toggle('nav-link-active', link.dataset.section === topIntersectingSectionId);
                });
                if (mobileMenu) {
                    const mobileLinks = mobileMenu.querySelectorAll(mobileNavLinksQuery);
                    mobileLinks.forEach(link => {
                        link.classList.toggle('nav-link-active', link.dataset.section === topIntersectingSectionId);
                    });
                }
            }
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
        elementsToAnimate.forEach(el => observer.observe(el));
    }
});
