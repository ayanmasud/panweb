// Prevent zooming
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { 
        event.preventDefault(); 
    }
}, { passive: false });

// Disable double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile nav bar
    if (window.innerWidth <= 768px) {
        const mobileNavBar = document.createElement('div');
        mobileNavBar.className = 'mobile-nav-bar';
        
        const navHTML = `
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="help.html">Get Help</a></li>
                <li><a href="volunteer.html">Volunteer</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="https://www.zeffy.com" class="donate-btn">Donate</a></li>
            </ul>
        `;
        mobileNavBar.innerHTML = navHTML;
        
        // Insert after header
        const header = document.querySelector('header');
        if (header) {
            header.parentNode.insertBefore(mobileNavBar, header.nextSibling);
            
            // Highlight current page
            const currentPage = location.pathname.split('/').pop();
            mobileNavBar.querySelectorAll('a').forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Video fallback for mobile
    if (window.innerWidth <= 768px) {
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            // Replace with static image if needed
            // videoContainer.innerHTML = '<img src="mobile-banner.jpg" alt="Peace Action Network">';
        }
    }
});

// Rest of your existing JavaScript...
[PASTE ALL YOUR EXISTING JAVASCRIPT HERE]


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
