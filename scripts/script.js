// Language Switcher Functionality
const languageToggle = document.getElementById('language-toggle');
const languageDropdown = document.getElementById('language-dropdown');
const currentLang = document.querySelector('.current-lang');

// Check for saved language preference or default to English
const savedLanguage = localStorage.getItem('language') || 'en';
document.documentElement.setAttribute('lang', savedLanguage);
currentLang.textContent = savedLanguage.toUpperCase();

// Update active language in dropdown
document.querySelectorAll('.language-dropdown li').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-lang') === savedLanguage) {
        item.classList.add('active');
    }
});

// Language toggle function
function toggleLanguageDropdown() {
    languageDropdown.classList.toggle('active');
}

// Change language function
function changeLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Update current language display
    currentLang.textContent = lang.toUpperCase();

    // Update active language in dropdown
    document.querySelectorAll('.language-dropdown li').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-lang') === lang) {
            item.classList.add('active');
        }
    });

    // Update all translatable elements using translations object
    if (translations[lang]) {
        Object.keys(translations[lang]).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = translations[lang][key];
            }
        });

        // Update page title
        const titleElement = document.querySelector('title');
        if (titleElement && translations[lang]['page_title']) {
            titleElement.textContent = translations[lang]['page_title'];
        }

        // Update hero title with typing effect
        const heroTitle = document.getElementById('hero-full-title');
        if (heroTitle) {
            const greeting = translations[lang]['hero-greeting'];
            const name = translations[lang]['hero-name'];
            typeWriterWithHighlight(heroTitle, greeting, name, 50);
        }
    }

    // Save language preference
    localStorage.setItem('language', lang);

    // Close dropdown
    languageDropdown.classList.remove('active');
}

// Add event listeners
languageToggle.addEventListener('click', toggleLanguageDropdown);

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('active');
    }
});

// Language selection
document.querySelectorAll('.language-dropdown li').forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(savedLanguage);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Theme toggle function
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Add event listener to theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-tag, .contact-link');

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Typing effect for hero title with highlight preservation
function typeWriterWithHighlight(element, greeting, name, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < greeting.length) {
            element.innerHTML += greeting.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (i === greeting.length) {
            // Add space and start typing the name with highlight
            element.innerHTML += ' <span class="highlight">';
            i++;
            setTimeout(type, speed);
        } else if (i > greeting.length && i <= greeting.length + name.length + 1) {
            if (i === greeting.length + name.length + 1) {
                // Close the highlight span
                element.innerHTML += '</span>';
            } else {
                // Type the name characters
                element.innerHTML += name.charAt(i - greeting.length - 1);
            }
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill tag animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact link hover effects
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);
