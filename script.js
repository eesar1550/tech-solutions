// Mobile Menu Toggle (improved for responsive nav)
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu when a link is clicked (for better UX)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Trigger animation on page load
window.addEventListener('load', animateOnScroll);

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Blob Animation Enhancement
const blob = document.querySelector('.blob');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    blob.style.transform = `translate(${mouseX * 50}px, ${mouseY * 50}px)`;
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Animated Counters for About Section
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 40; // smaller is faster
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);
            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + '+';
            }
        };
        // Only animate if not already done
        if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            updateCount();
        }
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about');
    if (aboutSection && isInViewport(aboutSection)) {
        animateCounters();
    }
});

window.addEventListener('load', () => {
    const aboutSection = document.querySelector('.about');
    if (aboutSection && isInViewport(aboutSection)) {
        animateCounters();
    }
});

// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(mode) {
    if (mode === 'light') {
        document.body.classList.add('light');
        themeToggle.classList.add('active');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('light');
        themeToggle.classList.remove('active');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', mode);
}

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
});

// On load, set theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setTheme('light');
    else setTheme('dark');
});

// Animate On Scroll (AOS) - lightweight implementation
function aosInit() {
    const elements = document.querySelectorAll('[data-aos]');
    function animate() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('aos-animate');
            }
        });
    }
    window.addEventListener('scroll', animate);
    window.addEventListener('load', animate);
    animate();
}
aosInit();

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
let testimonialIndex = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
}
if (testimonialCards.length) {
    showTestimonial(testimonialIndex);
    testimonialPrev.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(testimonialIndex);
    });
    testimonialNext.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
        showTestimonial(testimonialIndex);
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}); 