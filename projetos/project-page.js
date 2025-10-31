/* ================================================
   PROJECT PAGE - JAVASCRIPT
   Interactive features for project showcase
   ================================================ */

$(document).ready(function() {
    'use strict';

    // ========== MAIN CAROUSEL INITIALIZATION ==========
    const mainCarousel = new Swiper('.media-carousel', {
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'slide',
        speed: 800,
    });

    // ========== THUMBNAIL CAROUSEL INITIALIZATION ==========
    const thumbnailCarousel = new Swiper('.thumbnail-carousel', {
        loop: true,
        spaceBetween: 15,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 15
            }
        }
    });

    // ========== SYNC CAROUSELS ==========
    mainCarousel.controller.control = thumbnailCarousel;
    thumbnailCarousel.controller.control = mainCarousel;

    // Highlight active thumbnail
    mainCarousel.on('slideChange', function() {
        $('.thumbnail-item').removeClass('active');
        $('.thumbnail-item').eq(mainCarousel.realIndex).addClass('active');
    });

    // Click thumbnail to change main slide
    $('.thumbnail-item').click(function() {
        const index = $(this).parent().index();
        mainCarousel.slideTo(index);
    });

    // ========== VIDEO CONTROLS ==========
    const videos = document.querySelectorAll('.media-item video');

    videos.forEach(video => {
        // Pause video when slide changes
        mainCarousel.on('slideChange', function() {
            video.pause();
        });

        // Play video on hover (optional)
        video.addEventListener('mouseenter', function() {
            if (video.paused) {
                video.play();
            }
        });

        // Pause video when mouse leaves (optional)
        video.addEventListener('mouseleave', function() {
            video.pause();
        });
    });

    // ========== LIGHTBOX CONFIGURATION ==========
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': "Imagem %1 de %2",
            'disableScrolling': true
        });
    }

    // ========== SMOOTH SCROLL ==========
    $('a[href^="#"]').click(function(e) {
        const target = $(this).attr('href');
        if ($(target).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800);
        }
    });

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to elements
    document.querySelectorAll('.result-card, .tech-category, .sidebar-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // ========== ANIMATED STATISTICS ==========
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatValue(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-value').forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateStatValue(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const hasCurrency = text.includes('R$');
        const hasTime = text.includes('ms') || text.includes('s');

        // Extract numeric value
        let numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));

        if (isNaN(numericValue)) return;

        let current = 0;
        const increment = numericValue / 60;
        const duration = 2000;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }

            let displayValue = Math.floor(current);

            if (hasCurrency) {
                displayValue = 'R$ ' + displayValue + 'K/mês';
            } else if (hasTime) {
                displayValue = '<' + displayValue + 'ms';
            } else if (hasPercent) {
                displayValue = (hasPlus ? '+' : '') + displayValue + '%';
            } else if (hasPlus) {
                displayValue = '+' + displayValue + '%';
            } else if (text.includes('/s')) {
                displayValue = displayValue + '/s';
            }

            element.textContent = displayValue;
        }, stepTime);
    }

    // ========== BACK BUTTON BEHAVIOR ==========
    $('.back-btn').click(function(e) {
        // Check if there's history to go back to
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            e.preventDefault();
            window.history.back();
        }
        // Otherwise, let the default href behavior work
    });

    // ========== SHARE FUNCTIONALITY ==========
    function shareProject() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: $('.project-tagline').text(),
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: Copy URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copiado para a área de transferência!');
            });
        }
    }

    // Add share button if needed
    if ($('.project-actions').length && navigator.share) {
        const shareBtn = $('<button class="btn btn-outline ripple"><i class="fas fa-share-alt"></i> <span>Compartilhar</span></button>');
        shareBtn.click(shareProject);
        $('.project-actions').append(shareBtn);
    }

    // ========== RIPPLE EFFECT ==========
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

    // ========== CODE SYNTAX HIGHLIGHTING (OPTIONAL) ==========
    // If using Prism.js or highlight.js, initialize here
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    } else if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // ========== LAZY LOAD IMAGES ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
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

    // ========== STICKY SIDEBAR (OPTIONAL) ==========
    function initStickySidebar() {
        const sidebar = $('.overview-sidebar');
        if (sidebar.length) {
            const sidebarTop = sidebar.offset().top - 100;

            $(window).scroll(function() {
                const scrollTop = $(window).scrollTop();

                if (scrollTop > sidebarTop) {
                    sidebar.addClass('sticky-sidebar');
                } else {
                    sidebar.removeClass('sticky-sidebar');
                }
            });
        }
    }

    // Uncomment to enable sticky sidebar
    // initStickySidebar();

    // ========== READING PROGRESS BAR ==========
    $(window).scroll(function() {
        const winScroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const scrolled = (winScroll / height) * 100;

        // You can add a progress bar element if needed
        // $('.reading-progress').css('width', scrolled + '%');
    });

    // ========== PRINT FUNCTIONALITY ==========
    $('.print-btn').click(function() {
        window.print();
    });

    // ========== TECH TAG INTERACTIONS ==========
    $('.tech-tag').hover(
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // ========== FEATURE CARD ANIMATIONS ==========
    $('.features-list li').each(function(index) {
        $(this).css({
            'animation': `fadeInUp 0.6s ease forwards ${index * 0.1}s`,
            'opacity': '0'
        });
    });

    // ========== PERFORMANCE MONITORING ==========
    window.addEventListener('load', function() {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Project page load time: ${pageLoadTime}ms`);
        }
    });

    // ========== ACCESSIBILITY ENHANCEMENTS ==========
    // Add keyboard navigation for carousel
    $(document).keydown(function(e) {
        if (e.key === 'ArrowLeft') {
            mainCarousel.slidePrev();
        } else if (e.key === 'ArrowRight') {
            mainCarousel.slideNext();
        }
    });

    // ========== CONSOLE MESSAGE ==========
    console.log('%c🚀 Project Page Loaded', 'font-size: 16px; color: #79DE79; font-weight: bold;');
    console.log('%cInteressado no código? Visite o GitHub!', 'font-size: 12px; color: #2A2F4F;');

}); // End document ready

// ========== ADD FADE IN ANIMATION KEYFRAMES ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
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

    .sticky-sidebar {
        position: fixed;
        top: 100px;
        width: inherit;
    }
`;
document.head.appendChild(style);
