// ===== MOBILE ZOOM PREVENTION =====
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

// ===== MAIN DOCUMENT READY FUNCTION =====
document.addEventListener('DOMContentLoaded', function() {
    // ===== TOUCH DEVICE DETECTION =====
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }

    // ===== MOBILE NAVIGATION =====
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    const header = document.querySelector('header');
    if (header) {
        // Add mobile menu button
        header.prepend(mobileMenuBtn);
        
        // Get navigation elements
        const nav = header.querySelector('nav');
        const navLinks = nav ? nav.querySelectorAll('a') : [];
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function() {
            if (nav) {
                nav.classList.toggle('show');
                this.setAttribute('aria-expanded', nav.classList.contains('show'));
            }
        });
        
        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav) {
                    nav.classList.remove('show');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav && !nav.contains(e.target)) {
                nav.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== CREATE MOBILE NAV BAR FOR SMALL SCREENS =====
    if (window.innerWidth <= 768) {
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

    // ===== VIDEO FALLBACK FOR MOBILE =====
    if (window.innerWidth <= 768) {
        const videoContainer = document.querySelector('.video-container iframe');
        const fallback = document.querySelector('.video-fallback');
        if (videoContainer && fallback) {
            videoContainer.style.display = 'none';
            fallback.style.display = 'block';
        }
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
                const mobileMenu = document.querySelector('nav');
                if (mobileMenu && mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                    const menuBtn = document.querySelector('.mobile-menu-btn');
                    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ===== FORM HANDLING =====
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
    const yearElement = document.getElementById('current-year') || document.querySelector('footer .footer-bottom p');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
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

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', function() {
    // Close mobile menu when resizing to larger screens
    if (window.innerWidth > 768) {
        const mobileMenu = document.querySelector('nav');
        if (mobileMenu && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Handle video fallback on resize
    const videoContainer = document.querySelector('.video-container iframe');
    const fallback = document.querySelector('.video-fallback');
    if (window.innerWidth <= 768) {
        if (videoContainer && fallback) {
            videoContainer.style.display = 'none';
            fallback.style.display = 'block';
        }
    } else {
        if (videoContainer && fallback) {
            videoContainer.style.display = 'block';
            fallback.style.display = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.querySelector('.video-container');
  const bgVideo = document.getElementById('bg-video');
  
  if (bgVideo) {
    // Check if video can play
    const videoCanPlay = () => {
      return bgVideo.readyState > 0;
    };
    
    // Handle video loading
    bgVideo.addEventListener('canplay', function() {
      videoContainer.classList.add('video-loaded');
      try {
        bgVideo.play();
      } catch (e) {
        console.log('Autoplay prevented:', e);
      }
    });
    
    // Fallback if video fails to load
    setTimeout(() => {
      if (!videoCanPlay()) {
        videoContainer.classList.add('video-loaded');
      }
    }, 3000);
    
    // Ensure video plays when user interacts (for some mobile browsers)
    document.addEventListener('click', function() {
      if (videoCanPlay() && bgVideo.paused) {
        bgVideo.play();
      }
    }, { once: true });
  }
});

// Add this to your existing video handling code
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('bg-video');
  
  // Fix for iOS - prevents inline playback issues
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
  }
  
  // Ensure video stays properly sized
  window.addEventListener('resize', function() {
    if (video) {
      video.style.width = '';
      video.style.height = '';
      video.style.minWidth = '100%';
      video.style.minHeight = '100%';
    }
  });
});