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

// Color analysis and glow effect for profile image
function analyzeImageColors(imageElement) {
    console.log('Analyzing image colors for:', imageElement.src);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = function () {
        console.log('Image loaded, dimensions:', img.width, 'x', img.height);
        try {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            console.log('Image data length:', data.length);

            // Sample colors from different parts of the image
            const colors = [];
            const step = Math.floor(data.length / 4 / 100); // Sample 100 pixels

            for (let i = 0; i < data.length; i += step * 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                if (a > 128) { // Only consider non-transparent pixels
                    colors.push({ r, g, b });
                }
            }

            console.log('Sampled colors:', colors.length);

            // Find dominant colors using k-means clustering
            const dominantColors = findDominantColors(colors, 3);
            console.log('Dominant colors:', dominantColors);

            // Apply colors to CSS custom properties
            const profileImage = document.querySelector('.profile-image');
            if (profileImage && dominantColors.length >= 3) {
                profileImage.style.setProperty('--glow-color-1', `rgb(${dominantColors[0].r}, ${dominantColors[0].g}, ${dominantColors[0].b})`);
                profileImage.style.setProperty('--glow-color-2', `rgb(${dominantColors[1].r}, ${dominantColors[1].g}, ${dominantColors[1].b})`);
                profileImage.style.setProperty('--glow-color-3', `rgb(${dominantColors[2].r}, ${dominantColors[2].g}, ${dominantColors[2].b})`);
                profileImage.classList.remove('glow-fallback');
                console.log('Applied custom colors to glow effect');
            } else {
                // Fallback to default glow
                console.log('Not enough dominant colors, using fallback');
                applyFallbackGlow();
            }
        } catch (error) {
            console.log('Color analysis failed, using fallback glow:', error);
            applyFallbackGlow();
        }
    };

    img.onerror = function () {
        console.log('Image failed to load for color analysis, using fallback glow');
        applyFallbackGlow();
    };

    img.src = imageElement.src;
}

// Apply fallback glow effect
function applyFallbackGlow() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.classList.add('glow-fallback');
        console.log('Fallback glow applied to profile image');
    } else {
        console.log('Profile image not found for fallback glow');
    }
}

// Simple k-means clustering to find dominant colors
function findDominantColors(colors, k) {
    if (colors.length === 0) return [];

    // Initialize centroids with random colors
    let centroids = [];
    for (let i = 0; i < k; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        centroids.push({ ...colors[randomIndex] });
    }

    // Perform k-means clustering
    for (let iteration = 0; iteration < 10; iteration++) {
        const clusters = Array.from({ length: k }, () => []);

        // Assign colors to nearest centroid
        colors.forEach(color => {
            let minDistance = Infinity;
            let nearestCentroid = 0;

            centroids.forEach((centroid, index) => {
                const distance = Math.sqrt(
                    Math.pow(color.r - centroid.r, 2) +
                    Math.pow(color.g - centroid.g, 2) +
                    Math.pow(color.b - centroid.b, 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestCentroid = index;
                }
            });

            clusters[nearestCentroid].push(color);
        });

        // Update centroids
        clusters.forEach((cluster, index) => {
            if (cluster.length > 0) {
                const avgR = Math.round(cluster.reduce((sum, c) => sum + c.r, 0) / cluster.length);
                const avgG = Math.round(cluster.reduce((sum, c) => sum + c.g, 0) / cluster.length);
                const avgB = Math.round(cluster.reduce((sum, c) => sum + c.b, 0) / cluster.length);
                centroids[index] = { r: avgR, g: avgG, b: avgB };
            }
        });
    }

    // Sort by cluster size (largest first)
    const clusterSizes = centroids.map((_, index) =>
        colors.filter(color => {
            let minDistance = Infinity;
            let nearestCentroid = 0;

            centroids.forEach((centroid, i) => {
                const distance = Math.sqrt(
                    Math.pow(color.r - centroid.r, 2) +
                    Math.pow(color.g - centroid.g, 2) +
                    Math.pow(color.b - centroid.b, 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestCentroid = i;
                }
            });

            return nearestCentroid === index;
        }).length
    );

    const sortedIndices = clusterSizes
        .map((size, index) => ({ size, index }))
        .sort((a, b) => b.size - a.size)
        .map(item => item.index);

    return sortedIndices.map(index => centroids[index]);
}

// Initialize color analysis when page loads
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');

    if (profileImage) {
        console.log('Profile image found, glow effect active');

        // Apply fallback glow immediately
        applyFallbackGlow();

        // Wait a bit for the image to load, then try color analysis
        setTimeout(() => {
            console.log('Starting color analysis...');
            analyzeImageColors(profileImage);
        }, 2000);
    } else {
        console.log('Profile image not found');
    }
}); 