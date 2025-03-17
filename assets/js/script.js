// Menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Initial setup
    menuToggle.style.display = 'block';
    navMenu.style.display = 'block';
    navMenu.style.transform = 'translateX(-100%)';

    // Show/hide menu on toggle click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Toggle menu position
        if (navMenu.classList.contains('active')) {
            navMenu.style.transform = 'translateX(0)';
        } else {
            navMenu.style.transform = 'translateX(-100%)';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            navMenu.style.transform = 'translateX(-100%)';
        }
    });

    // Prevent menu from closing when clicking inside
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            navMenu.style.transform = 'translateX(-100%)';
        });
    });
});

let lastScrollTop = 0;
const header = document.querySelector('.header');
let isScrolling;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add transition class if not present
    if (!header.classList.contains('header-transition')) {
        header.classList.add('header-transition');
    }
    
    // Determine scroll direction
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
    
    // Clear previous timeout
    clearTimeout(isScrolling);
    
    // Set new timeout
    isScrolling = setTimeout(() => {
        header.classList.remove('header-transition');
    }, 100);
});