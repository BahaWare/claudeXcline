// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Pricing toggle
const pricingToggle = document.getElementById('pricing-toggle');
const priceAmounts = document.querySelectorAll('.amount');

pricingToggle.addEventListener('change', () => {
    priceAmounts.forEach(amount => {
        const monthly = amount.getAttribute('data-monthly');
        const yearly = amount.getAttribute('data-yearly');
        
        if (pricingToggle.checked) {
            amount.textContent = yearly;
        } else {
            amount.textContent = monthly;
        }
    });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters
            if (entry.target.classList.contains('stat')) {
                animateCounter(entry.target.querySelector('h3'));
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

document.querySelectorAll('.stat').forEach(stat => {
    observer.observe(stat);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .feature-card.animate,
    .pricing-card.animate,
    .testimonial-card.animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s ease-out;
    }
    
    .pricing-card:nth-child(2).animate {
        transition-delay: 0.1s;
    }
    
    .pricing-card:nth-child(3).animate {
        transition-delay: 0.2s;
    }
`;
document.head.appendChild(style);

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    // Special handling for different stat types
    if (element.textContent.includes('K')) {
        element.textContent = '0K+';
        const targetNum = 10;
        const step = targetNum / (duration / 16);
        let current = 0;
        
        const updateK = () => {
            current += step;
            if (current < targetNum) {
                element.textContent = Math.floor(current) + 'K+';
                requestAnimationFrame(updateK);
            } else {
                element.textContent = '10K+';
            }
        };
        updateK();
    } else if (element.textContent.includes('%')) {
        element.textContent = '0%';
        const targetNum = 99.9;
        const step = targetNum / (duration / 16);
        let current = 0;
        
        const updatePercent = () => {
            current += step;
            if (current < targetNum) {
                element.textContent = Math.floor(current) + '%';
                requestAnimationFrame(updatePercent);
            } else {
                element.textContent = '99.9%';
            }
        };
        updatePercent();
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    if (parallax) {
        const speed = 0.5;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Show success message
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            e.target.reset();
        }, 3000);
    });
}

// Button ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            heroTitle.innerHTML = originalText;
        }, 500);
    }
});

// Add hover effect to cards
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    sectionObserver.observe(section);
});

// Mobile menu styles
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-buttons {
            position: fixed;
            left: -100%;
            top: 300px;
            flex-direction: column;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            padding: 0 2rem;
        }
        
        .nav-buttons.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// Performance optimization - lazy load images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console Easter egg
console.log('%c🚀 Welcome to CloudFlow!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWe\'re hiring! Check out our careers page.', 'font-size: 14px; color: #64748b;');
