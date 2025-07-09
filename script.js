// Main JavaScript for Peace Action Network website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header');
    if (header) {
        header.prepend(mobileMenuBtn);
        const nav = header.querySelector('nav');
        
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }

    // Admin modal functionality
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        const adminBtn = document.createElement('a');
        adminBtn.href = '#';
        adminBtn.className = 'admin-btn';
        adminBtn.textContent = 'Admin Login';
        
        const footer = document.querySelector('footer .container');
        if (footer) {
            footer.querySelector('.footer-bottom').prepend(adminBtn);
        }
        
        adminBtn.addEventListener('click', function(e) {
            e.preventDefault();
            adminModal.style.display = 'block';
        });
        
        const closeBtn = adminModal.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            adminModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === adminModal) {
                adminModal.style.display = 'none';
            }
        });
        
        const adminForm = document.getElementById('adminForm');
        if (adminForm) {
            adminForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real implementation, this would validate and send to server
                alert('Admin login functionality would connect to backend here');
                adminModal.style.display = 'none';
                window.location.href = 'admin.html';
            });
        }
    }

    // Volunteer form handling
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form validation would go here
            alert('Thank you for your volunteer application! We will contact you soon.');
            this.reset();
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form validation would go here
            alert('Thank you for your message! We will respond as soon as possible.');
            this.reset();
        });
    }

    // Donation form handling
    const donationForms = [document.getElementById('oneTimeDonation'), document.getElementById('monthlyDonation')];
    donationForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Form validation would go here
                alert('Thank you for your donation! A receipt will be sent to your email.');
                this.reset();
            });
        }
    });

    // Donation amount other option
    const amountRadios = document.querySelectorAll('input[name="donationAmount"], input[name="monthlyAmount"]');
    amountRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const otherInputId = this.id === 'amountOther' ? 'otherAmount' : 'monthlyOtherAmount';
            const otherInput = document.getElementById(otherInputId);
            otherInput.style.display = this.value === 'other' ? 'inline-block' : 'none';
            if (this.value !== 'other') otherInput.value = '';
        });
    });

    // Tab functionality for donation page
    function openTab(tabName) {
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }
        
        const tabButtons = document.getElementsByClassName('tab-button');
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        
        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    // Initialize any tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openTab(tabName);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Current year for footer
    const yearSpan = document.querySelector('footer .footer-bottom p');
    if (yearSpan) {
        yearSpan.textContent = yearSpan.textContent.replace('2023', new Date().getFullYear());
    }
});

// Admin dashboard specific functionality
if (document.body.classList.contains('admin-body')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Table row selection
        const tableRows = document.querySelectorAll('table tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('click', function(e) {
                if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
                    this.classList.toggle('selected');
                }
            });
        });

        // Status filter dropdown
        const statusFilters = document.querySelectorAll('.status-filter');
        statusFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                const table = this.closest('.recent-volunteers, .recent-donations').querySelector('table');
                const status = this.value;
                
                table.querySelectorAll('tbody tr').forEach(row => {
                    if (status === 'all') {
                        row.style.display = '';
                    } else {
                        const rowStatus = row.querySelector('.status').classList.contains(status) ? status : '';
                        row.style.display = rowStatus === status ? '' : 'none';
                    }
                });
            });
        });

        // Search functionality
        const searchInputs = document.querySelectorAll('.admin-search input');
        searchInputs.forEach(input => {
            input.addEventListener('keyup', function() {
                const table = this.closest('.admin-content').querySelector('table');
                const searchTerm = this.value.toLowerCase();
                
                table.querySelectorAll('tbody tr').forEach(row => {
                    const rowText = row.textContent.toLowerCase();
                    row.style.display = rowText.includes(searchTerm) ? '' : 'none';
                });
            });
        });
    });
}