// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const announcementBanner = document.getElementById('announcement-banner');
const closeAnnouncementBtn = document.getElementById('close-announcement');
const bookingForm = document.getElementById('booking-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Announcement Banner Management
class AnnouncementManager {
    constructor() {
        this.init();
    }

    init() {
        this.loadAnnouncement();
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (closeAnnouncementBtn) {
            closeAnnouncementBtn.addEventListener('click', () => {
                this.hideAnnouncement();
            });
        }
    }

    loadAnnouncement() {
        // Check if announcement was previously dismissed
        const isDismissed = localStorage.getItem('announcementDismissed');
        const lastDismissedDate = localStorage.getItem('announcementDismissedDate');
        const today = new Date().toDateString();

        // Show announcement if not dismissed today
        if (!isDismissed || lastDismissedDate !== today) {
            this.showAnnouncement();
        } else {
            this.hideAnnouncement();
        }
    }

    showAnnouncement() {
        if (announcementBanner) {
            announcementBanner.classList.remove('hidden');
            // Adjust header top position
            header.style.top = announcementBanner.offsetHeight + 'px';
        }
    }

    hideAnnouncement() {
        if (announcementBanner) {
            announcementBanner.classList.add('hidden');
            header.style.top = '0';
            
            // Remember dismissal for today
            localStorage.setItem('announcementDismissed', 'true');
            localStorage.setItem('announcementDismissedDate', new Date().toDateString());
        }
    }

    updateAnnouncement(message, type = 'info') {
        const announcementText = document.getElementById('announcement-text');
        const icon = announcementBanner.querySelector('i');
        
        if (announcementText) {
            announcementText.textContent = message;
        }

        // Update icon based on type
        if (icon) {
            icon.className = this.getIconClass(type);
        }

        // Update banner color based on type
        announcementBanner.className = `announcement-banner ${type}`;
        
        this.showAnnouncement();
        
        // Clear previous dismissal to show new announcement
        localStorage.removeItem('announcementDismissed');
    }

    getIconClass(type) {
        const icons = {
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle',
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle'
        };
        return icons[type] || icons.info;
    }
}

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const announcementHeight = announcementBanner && !announcementBanner.classList.contains('hidden') 
                ? announcementBanner.offsetHeight : 0;
            const offset = headerHeight + announcementHeight + 20;
            
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Booking Form Management
class BookingManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setMinDate();
    }

    setupEventListeners() {
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission(e);
            });
        }
    }

    setMinDate() {
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
    }

    handleBookingSubmission(e) {
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData);

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'];
        const missingFields = requiredFields.filter(field => !bookingData[field]);

        if (missingFields.length > 0) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        if (!this.isValidEmail(bookingData.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Validate phone format
        if (!this.isValidPhone(bookingData.phone)) {
            this.showMessage('Please enter a valid phone number.', 'error');
            return;
        }

        // Validate appointment date/time
        if (!this.isValidAppointmentTime(bookingData.date, bookingData.time)) {
            this.showMessage('Please select a valid appointment time during business hours.', 'error');
            return;
        }

        // Simulate booking submission (replace with actual API call)
        this.submitBooking(bookingData);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    isValidAppointmentTime(date, time) {
        const appointmentDate = new Date(`${date}T${time}`);
        const now = new Date();
        const dayOfWeek = appointmentDate.getDay();
        const hour = appointmentDate.getHours();

        // Check if appointment is in the future
        if (appointmentDate <= now) {
            return false;
        }

        // Business hours: Mon-Fri 9am-7pm, Sat 9am-6pm, Sun 10am-5pm
        if (dayOfWeek === 0) { // Sunday
            return hour >= 10 && hour < 17;
        } else if (dayOfWeek === 6) { // Saturday
            return hour >= 9 && hour < 18;
        } else { // Monday-Friday
            return hour >= 9 && hour < 19;
        }
    }

    async submitBooking(bookingData) {
        try {
            // Show loading state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For now, we'll simulate a successful booking
            // In a real application, this would be an actual API call
            console.log('Booking submitted:', bookingData);

            // Show success message
            this.showMessage('Booking request submitted successfully! We\'ll contact you shortly to confirm your appointment.', 'success');
            
            // Reset form
            bookingForm.reset();
            this.setMinDate();

            // Update announcement banner with success message
            const announcementManager = new AnnouncementManager();
            announcementManager.updateAnnouncement('New booking received! We\'ll contact you soon.', 'success');

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

        } catch (error) {
            console.error('Booking submission error:', error);
            this.showMessage('Sorry, there was an error submitting your booking. Please try again or call us directly.', 'error');
            
            // Reset button
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Book Appointment';
            submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.booking-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `booking-message ${type}`;
        messageDiv.innerHTML = `
            <i class="${this.getMessageIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        messageDiv.style.cssText = `
            padding: 15px 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            ${this.getMessageStyles(type)}
        `;

        // Insert message at the top of the form
        bookingForm.insertBefore(messageDiv, bookingForm.firstChild);

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    getMessageIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    getMessageStyles(type) {
        const styles = {
            success: 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;',
            error: 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;',
            warning: 'background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;',
            info: 'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;'
        };
        return styles[type] || styles.info;
    }
}

// Scroll Animation Observer
class ScrollAnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addAnimationClasses();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, options);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            this.observer.observe(el);
        });
    }

    addAnimationClasses() {
        // Add animation classes to various elements
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.classList.add('fade-in');
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Add slide animations to about section
        const aboutText = document.querySelector('.about-text');
        const aboutImage = document.querySelector('.about-image');
        if (aboutText) aboutText.classList.add('slide-in-left');
        if (aboutImage) aboutImage.classList.add('slide-in-right');

        // Add animations to contact items
        document.querySelectorAll('.contact-item').forEach((item, index) => {
            item.classList.add('fade-in');
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// Utility Functions
const utils = {
    // Format phone number for display
    formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    },

    // Format date for display
    formatDate(dateString) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    },

    // Format time for display
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// POS Integration Placeholder
class POSIntegration {
    constructor() {
        this.isConnected = false;
        this.init();
    }

    init() {
        // Placeholder for future POS system integration
        console.log('POS Integration initialized - ready for future implementation');
    }

    // Placeholder methods for future POS integration
    async processPayment(paymentData) {
        // Future implementation for payment processing
        console.log('Payment processing placeholder:', paymentData);
    }

    async getServicePricing() {
        // Future implementation for dynamic pricing from POS
        console.log('Service pricing fetch placeholder');
    }

    async updateInventory(serviceId) {
        // Future implementation for inventory updates
        console.log('Inventory update placeholder:', serviceId);
    }
}

// Scheduling Integration Placeholder
class SchedulingIntegration {
    constructor() {
        this.availableSlots = [];
        this.init();
    }

    init() {
        // Placeholder for future scheduling system integration
        console.log('Scheduling Integration initialized - ready for future implementation');
    }

    // Placeholder methods for future scheduling integration
    async getAvailableSlots(date, serviceType) {
        // Future implementation for real-time availability
        console.log('Available slots fetch placeholder:', date, serviceType);
        return [];
    }

    async bookAppointment(appointmentData) {
        // Future implementation for appointment booking
        console.log('Appointment booking placeholder:', appointmentData);
    }

    async cancelAppointment(appointmentId) {
        // Future implementation for appointment cancellation
        console.log('Appointment cancellation placeholder:', appointmentId);
    }

    async getStaffAvailability(staffId, date) {
        // Future implementation for staff availability
        console.log('Staff availability placeholder:', staffId, date);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    const announcementManager = new AnnouncementManager();
    const bookingManager = new BookingManager();
    const scrollAnimationObserver = new ScrollAnimationObserver();
    
    // Initialize integration placeholders
    const posIntegration = new POSIntegration();
    const schedulingIntegration = new SchedulingIntegration();

    // Make managers globally available for admin functions
    window.salonWebsite = {
        announcementManager,
        bookingManager,
        posIntegration,
        schedulingIntegration,
        utils
    };

    console.log('Haircutecture website loaded successfully!');
});

// Admin functions for managing announcements (for future admin panel)
window.adminFunctions = {
    updateAnnouncement: (message, type = 'info') => {
        if (window.salonWebsite.announcementManager) {
            window.salonWebsite.announcementManager.updateAnnouncement(message, type);
        }
    },
    
    hideAnnouncement: () => {
        if (window.salonWebsite.announcementManager) {
            window.salonWebsite.announcementManager.hideAnnouncement();
        }
    },
    
    showAnnouncement: () => {
        if (window.salonWebsite.announcementManager) {
            window.salonWebsite.announcementManager.showAnnouncement();
        }
    }
};

// Service Worker Registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Future implementation for offline capabilities
        console.log('Service Worker support detected - ready for PWA implementation');
    });
}
