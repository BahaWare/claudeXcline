// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initTestimonialSlider();
    initPricingToggle();
    initBackToTop();
    initAOSAnimations();
    initParallaxEffects();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.feature-card, .step, .pricing-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter animations for hero stats
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.innerText = '0';
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        // Hide all cards
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });

        // Remove active class from all dots
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current card and activate dot
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        if (navDots[index]) {
            navDots[index].classList.add('active');
        }
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    };

    const startSlideshow = () => {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    const stopSlideshow = () => {
        clearInterval(slideInterval);
    };

    // Add click event to navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideshow();
            startSlideshow(); // Restart the slideshow
        });
    });

    // Pause slideshow on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopSlideshow);
        testimonialSlider.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow
    startSlideshow();
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly');
    const annualPrices = document.querySelectorAll('.annual');

    if (toggle) {
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                // Show annual prices
                monthlyPrices.forEach(price => {
                    price.style.display = 'none';
                });
                annualPrices.forEach(price => {
                    price.style.display = 'inline';
                });
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => {
                    price.style.display = 'inline';
                });
                annualPrices.forEach(price => {
                    price.style.display = 'none';
                });
            }
        });
    }
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// AOS (Animate On Scroll) functionality
function initAOSAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.card');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax effect for hero background
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Floating animation for cards based on scroll
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 70; // Height of fixed navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button click animations
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        // Create ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation and interaction (if forms are added)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form validation logic here
            const formData = new FormData(form);
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1000);
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const navDots = document.querySelectorAll('.nav-dot');
        const activeIndex = Array.from(navDots).findIndex(dot => dot.classList.contains('active'));
        
        if (activeIndex !== -1) {
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = activeIndex > 0 ? activeIndex - 1 : navDots.length - 1;
            } else {
                newIndex = activeIndex < navDots.length - 1 ? activeIndex + 1 : 0;
            }
            
            navDots[newIndex].click();
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any scroll-based animations that need throttling
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Error handling for failed resource loads
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        // Handle failed image loads
        e.target.style.display = 'none';
        console.warn('Failed to load image:', e.target.src);
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.setAttribute('id', 'main');
        heroSection.setAttribute('role', 'main');
    }
}

// Initialize accessibility features
initAccessibility();

console.log('CloudFlow SaaS Landing Page - All systems operational! 🚀');
