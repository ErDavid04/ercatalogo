// ===== ANIMACIONES AL SCROLL - VERSIÓN OPTIMIZADA =====
function animateOnScroll() {
    const elements = document.querySelectorAll(
        '.card, .price-range, .guide, .shipping-info, ' +
        '.section-title, .page-content h1, .prices-content h1, .table-container, ' +
        '.note, .catalog, .price-container-horizontal, ' +
        'nav, footer, .hero-content, .benefits-grid, .benefit-card, ' +
        '.how-to-steps, .how-step, .faq-list, .faq-item, .hero-actions, .hero-meta'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Animación inicial optimizada
function initialAnimation() {
    const criticalElements = [
        '.hero-content',
        'nav',
        '.page-content h1',
        '.prices-content h1'
    ];

    criticalElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element && isElementInViewport(element)) {
            element.classList.add('animated');
        }
    });

    setTimeout(animateOnScroll, 100);
}

// Helper viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

// ===== MENÚ HAMBURGUESA OPTIMIZADO =====
function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        // Función para alternar menú
        const toggleMenu = () => {
            const isActive = menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        // Evento click en el botón del menú
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    let scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) {
        scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Volver arriba');
        document.body.appendChild(scrollButton);
    }

    function handleScroll() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }

    // Usar requestAnimationFrame para mejor performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INICIALIZACIÓN PRINCIPAL OPTIMIZADA =====
function initErCatalogo() {
    console.log('🚀 Inicializando ErCatálogo...');

    // Inicializar componentes
    initMenu();
    initSmoothScroll();
    initScrollToTop();
    initialAnimation();

    // Manejar cambios de visibilidad
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(initialAnimation, 100);
        }
    });

    // Optimizar resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initialAnimation, 250);
    });
}

// ===== INICIALIZACIÓN SEGURA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initErCatalogo);
} else {
    initErCatalogo();
}

// ===== API GLOBAL PARA DEBUG =====
window.ErCatalogo = {
    refreshAnimations: function () {
        document.querySelectorAll('.animated').forEach(el => {
            el.classList.remove('animated');
        });
        setTimeout(initialAnimation, 100);
    },
    toggleMenu: function () {
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        if (menuToggle && navLinks) {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        }
    }
};

// Polyfill básico para requestAnimationFrame
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        return setTimeout(callback, 16);
    };
}

console.log('📦 ErCatálogo JS optimizado cargado');