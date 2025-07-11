// Main JavaScript for Peace Action Network website - Mobile Optimized

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    const header = document.querySelector('header');
    if (header) {
        header.prepend(mobileMenuBtn);
        const nav = header.querySelector('nav');
        const navLinks = nav.querySelectorAll('a');
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
            this.setAttribute('aria-expanded', nav.classList.contains('show'));
        });
        
        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('nav ul');
                if (mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                    document.querySelector('.mobile-menu-btn').setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ===== FORM HANDLING =====
    // Generic form submission handler
    const handleFormSubmit = (formId, successMessage) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real implementation, this would validate and send to server
                alert(successMessage);
                this.reset();
                
                // Scroll to top on mobile after form submission
                if (window.innerWidth <= 768) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }
    };

    // Handle all forms
    handleFormSubmit('volunteerForm', 'Thank you for your volunteer application! We will contact you soon.');
    handleFormSubmit('contactForm', 'Thank you for your message! We will respond as soon as possible.');
    handleFormSubmit('helpRequestForm', 'Thank you for your request! Our team will contact you within 2 business days.');
    handleFormSubmit('newsletter-form', 'Thank you for subscribing to our newsletter!');

    // ===== CURRENT YEAR IN FOOTER =====
    const yearSpan = document.querySelector('footer .footer-bottom p');
    if (yearSpan) {
        yearSpan.textContent = `Peace Action Network ${new Date().getFullYear()}`;
    }

    // ===== IMAGE LAZY LOADING FOR MOBILE =====
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ===== TOUCH DEVICE DETECTION =====
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Add touch class to body if touch device
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}
