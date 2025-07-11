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
