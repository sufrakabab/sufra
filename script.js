// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        // Toggle menu visibility on button click
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle ARIA attributes for accessibility
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
        });

        // Set initial ARIA attributes
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-controls', 'mobile-menu');
        mobileMenu.setAttribute('aria-hidden', 'true');

        // Close mobile menu when a navigation link inside it is clicked
        const mobileNavLinks = mobileMenu.querySelectorAll('a.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Hide menu
                menuButton.setAttribute('aria-expanded', 'false'); // Update ARIA
                mobileMenu.setAttribute('aria-hidden', 'true'); // Update ARIA
            });
        });
    } else {
        // Log warning if menu elements aren't found
        console.warn("Mobile menu button or menu element not found.");
    }

    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        // Log warning if footer year element isn't found
        console.warn("Element with ID 'current-year' not found for footer.");
    }

    // --- Intersection Observer for Nav Highlighting AND Animations ---
    const sections = document.querySelectorAll('section[id]'); // All sections with an ID
    const navLinks = document.querySelectorAll('nav a.nav-link'); // Desktop nav links
    const mobileNavLinksQuery = '#mobile-menu a.nav-link'; // Selector for mobile nav links

    // Select all elements designated for scroll animation
    const elementsToAnimate = document.querySelectorAll(`
        #about > div > div, #about > div > h2, #about > div > p, #about > div > a,
        #services .grid > div,
        #menu .grid > div,
        #contact .max-w-3xl > p, #contact form > div, #contact form button, #contact .text-center.mt-10
    `);

    // Proceed only if there are sections or elements to observe
    if (sections.length > 0 || elementsToAnimate.length > 0) {
        // Configure the Intersection Observer
        const observerOptions = {
            root: null, // Observe intersections relative to the viewport
            rootMargin: '0px',
            // Use multiple thresholds:
            // 0.1 (10% visible) for triggering animations early
            // 0.4 (40% visible) for triggering nav highlighting when section is more central
            threshold: [0.1, 0.4]
        };

        // Create the Intersection Observer instance
        const observer = new IntersectionObserver((entries, observerInstance) => {
            let intersectingSectionIdForNav = null; // Track the best candidate section for nav highlighting

            // Process each intersection entry
            entries.forEach(entry => {
                const targetElement = entry.target;

                // --- Animation Triggering Logic ---
                // Check if the intersecting element is one we want to animate
                if (Array.from(elementsToAnimate).includes(targetElement)) {
                    // Add animation classes if element is at least 10% visible
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                        targetElement.classList.add('is-visible', 'animate-fadeInUp');
                        // Optional: Stop observing the element after it animates once
                        // observerInstance.unobserve(targetElement);
                    }
                    // Optional: Remove classes if element scrolls out (for re-animation)
                    // else {
                    //     targetElement.classList.remove('is-visible', 'animate-fadeInUp');
                    // }
                }

                // --- Nav Highlighting Logic ---
                // Check if the intersecting element is a section with an ID
                if (targetElement.tagName === 'SECTION' && targetElement.hasAttribute('id')) {
                    // Check if the section is at least 40% visible for nav highlighting
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                        // If it's the first suitable section or higher on the page than the current candidate, make it the new candidate
                        if (intersectingSectionIdForNav === null || targetElement.offsetTop < document.getElementById(intersectingSectionIdForNav).offsetTop) {
                            intersectingSectionIdForNav = targetElement.getAttribute('id');
                        }
                    }
                }
            }); // End entries.forEach

            // --- Update Nav Highlighting Based on Best Candidate ---
            if (intersectingSectionIdForNav) {
                // Update desktop nav links
                navLinks.forEach(link => {
                    link.classList.toggle('nav-link-active', link.dataset.section === intersectingSectionIdForNav);
                });
                // Update mobile nav links
                if (mobileMenu) {
                    const mobileLinks = mobileMenu.querySelectorAll(mobileNavLinksQuery);
                    mobileLinks.forEach(link => {
                        link.classList.toggle('nav-link-active', link.dataset.section === intersectingSectionIdForNav);
                    });
                }
            }
            // Optional: If no section meets the 0.4 threshold, remove active class from all links
            // else {
            //     navLinks.forEach(link => link.classList.remove('nav-link-active'));
            //     if (mobileMenu) {
            //         mobileMenu.querySelectorAll(mobileNavLinksQuery).forEach(link => link.classList.remove('nav-link-active'));
            //     }
            // }

        }, observerOptions); // End IntersectionObserver callback

        // Start observing all sections (for nav highlighting)
        sections.forEach(section => {
            observer.observe(section);
        });

        // Start observing specific elements (for animations)
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });

    } else {
        // Log warning if no elements to observe are found
        console.warn("Could not find sections or elements to animate for Intersection Observer.");
    }

}); // End DOMContentLoaded
