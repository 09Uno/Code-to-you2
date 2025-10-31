/* ================================================
   MODERN PORTFOLIO - JAVASCRIPT
   Complete interactivity & animations
   ================================================ */

$(document).ready(function() {
    'use strict';

    // ========== LOADING SCREEN ==========
    setTimeout(function() {
        $('#loadingScreen').addClass('fade-out');
    }, 2000);

    // ========== CUSTOM CURSOR ==========
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effects on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .tech-icon-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // ========== SCROLL PROGRESS BAR ==========
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + '%';
    });

    // ========== STICKY NAVBAR ==========
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }

        // Scroll-up button
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // ========== SCROLL UP BUTTON ==========
    $('.scroll-up-btn').click(function(){
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // ========== SMOOTH SCROLL ON MENU ITEMS ==========
    $('.menu a').click(function(e){
        const target = $(this).attr('href');
        if(target.startsWith('#')) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800);

            // Close mobile menu if open
            $('.navbar .menu').removeClass('active');
            $('.menu-btn i').removeClass('active');
        }
    });

    // ========== MOBILE MENU TOGGLE ==========
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
    });

    // Close menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass('active');
            $('.menu-btn i').removeClass('active');
        }
    });

    // ========== TYPED.JS - TYPING ANIMATION ==========
    if($('.typing').length) {
        new Typed(".typing", {
            strings: [
                "Inteligência Artificial",
                "Machine Learning",
                "Sistemas C#/.NET",
                "Automação Inteligente",
                "Cloud Computing",
                "Arquitetura de Software"
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // ========== ANIMATED COUNTER ==========
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Trigger counter animation when visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========== SKILL BARS ANIMATION ==========
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.getAttribute('data-progress');
                progress.style.width = width + '%';
                skillObserver.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress').forEach(skill => {
        skillObserver.observe(skill);
    });

    // ========== AOS ANIMATION ==========
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }

    // ========== PARTICLES.JS ==========
    if(typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#79DE79'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#79DE79',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // ========== GSAP ANIMATIONS ==========
    if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Navbar animation on scroll
        gsap.to('.navbar', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    if(self.direction === -1) {
                        gsap.to('.navbar', { y: 0, duration: 0.3 });
                    } else if(self.progress > 0.1) {
                        gsap.to('.navbar', { y: -100, duration: 0.3 });
                    }
                }
            }
        });

        // About section parallax
        gsap.to('.profile-card img', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -50
        });

        // Skills cards stagger animation
        // Set initial visibility to ensure elements are visible if GSAP fails
        gsap.set('.tech-icon-item', { opacity: 1 });
        gsap.from('.tech-icon-item', {
            scrollTrigger: {
                trigger: '.tech-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Projects cards animation - Removed (using AOS instead to avoid conflicts)

        // Timeline items animation
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%'
            },
            opacity: 0,
            x: -50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
        });
    }

    // ========== RIPPLE EFFECT ON BUTTONS ==========
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ========== IMAGE LAZY LOADING ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========== TECH ICON HOVER EFFECT ==========
    document.querySelectorAll('.tech-icon-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const techName = this.getAttribute('data-tech');
            console.log(`Hovered: ${techName}`);
            // Can be used to show related projects
        });
    });

    // ========== PROJECT CARD TILT EFFECT ==========
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========== KONAMI CODE EASTER EGG ==========
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Easter egg animation
        document.body.style.animation = 'rainbow 2s infinite';

        // Create confetti effect
        for(let i = 0; i < 100; i++) {
            createConfetti();
        }

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        alert('🎉 Você encontrou o Easter Egg! 🎉\n\nParabéns por sua curiosidade!');
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '99999';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);

        const fall = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        fall.onfinish = () => confetti.remove();
    }

    // ========== THEME TOGGLE (OPTIONAL) ==========
    /*
    const themeToggle = document.getElementById('themeToggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
    */

    // ========== PERFORMANCE MONITORING ==========
    window.addEventListener('load', function() {
        // Log performance metrics
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }
    });

    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });

    // ========== SMOOTH SCROLL POLYFILL ==========
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollPolyfill = function(target) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScrollPolyfill(this.getAttribute('href'));
            });
        });
    }

    // ========== PRELOAD CRITICAL IMAGES ==========
    const preloadImages = [
        './image/avatar-placeholder.jpg',
        './image/profile-photo.jpg'
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ========== FORM VALIDATION (if form exists) ==========
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form validation and submission logic here
            console.log('Form submitted');
        });
    }

    // ========== PROJECTS CAROUSEL ==========
    if (document.querySelector('.projects-carousel')) {
        console.log('Inicializando Projects Carousel...');
        const projectsSwiper = new Swiper('.projects-carousel', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.projects-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.projects-next',
                prevEl: '.projects-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 35,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            },
            effect: 'slide',
            speed: 600,
            watchOverflow: true,
        });
        console.log('Projects Carousel inicializado:', projectsSwiper);
    } else {
        console.error('Elemento .projects-carousel não encontrado!');
    }

    // ========== CONSOLE MESSAGE ==========
    console.log('%c👋 Olá, Desenvolvedor Curioso!', 'font-size: 20px; color: #79DE79; font-weight: bold;');
    console.log('%cEste portfólio foi criado com muito ☕ e 💚', 'font-size: 14px; color: #2A2F4F;');
    console.log('%cProcurando por talentos? Entre em contato!', 'font-size: 14px; color: #4B5D78;');

}); // End document ready

// ========== CSS ANIMATION KEYFRAMES FOR RAINBOW (EASTER EGG) ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ========== SERVICE WORKER FOR PWA (OPTIONAL) ==========
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
*/
