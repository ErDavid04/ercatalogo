// ===== ANIMACIONES AL SCROLL - VERSIÓN OPTIMIZADA =====
function animateOnScroll() {
    const elements = document.querySelectorAll(
        '.card, .price-range, .guide, .shipping-info, ' +
        '.section-title, .page-content h1, .prices-content h1, .table-container, ' +
        '.note, .catalog, .price-container-horizontal, ' +
        'nav, footer, .hero-content'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Dejar de observar una vez animado
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
    // Animar elementos críticos inmediatamente
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

    // Animar elementos específicos de cada página
    const pageSpecificElements = [
        '.price-container-horizontal',
        '.shipping-info',
        '.guide',
        '.table-container'
    ];

    pageSpecificElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element && isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    });

    // Iniciar observador de scroll
    setTimeout(animateOnScroll, 100);
}

// Helper para verificar si elemento está en viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== MENÚ HAMBURGUESA =====
function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevenir scroll del body cuando el menú está abierto
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al presionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== TEMA OSCURO =====
function initTheme() {
    const html = document.getElementById("html-root");
    const themeToggle = document.getElementById("theme-toggle");

    // Verificar preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedPreference = localStorage.getItem("dark-mode");

    // Determinar tema inicial
    let isDark = storedPreference === "true" || (storedPreference === null && systemPrefersDark);

    if (isDark) {
        html.classList.add("dark-mode");
        if (themeToggle) themeToggle.textContent = "☀️";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            html.classList.toggle("dark-mode");
            const isNowDark = html.classList.contains("dark-mode");
            localStorage.setItem("dark-mode", isNowDark);
            themeToggle.textContent = isNowDark ? "☀️" : "🌑";

            // Agregar efecto de transición suave
            themeToggle.style.transform = 'scale(1.2)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem("dark-mode") === null) {
            const isNowDark = e.matches;
            if (isNowDark) {
                html.classList.add("dark-mode");
                if (themeToggle) themeToggle.textContent = "☀️";
            } else {
                html.classList.remove("dark-mode");
                if (themeToggle) themeToggle.textContent = "🌑";
            }
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
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

// ===== LAZY LOADING IMÁGENES =====
function initLazyLoading() {
    // Crear observer para lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Cargar imagen
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }

                // Manejar carga exitosa
                img.onload = () => {
                    img.classList.add('loaded');
                };

                // Manejar error de carga
                img.onerror = () => {
                    console.warn('Error cargando imagen:', img.dataset.src);
                    img.classList.add('error');
                };

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // Observar todas las imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== CONTADOR DE VISITAS =====
function initVisitorCounter() {
    if (localStorage.getItem('visitCount')) {
        let count = parseInt(localStorage.getItem('visitCount'));
        count++;
        localStorage.setItem('visitCount', count);
    } else {
        localStorage.setItem('visitCount', '1');
    }

    // Opcional: mostrar contador en consola para debugging
    console.log('Visitas totales:', localStorage.getItem('visitCount'));
}

// ===== SCROLL TO TOP MEJORADO =====
function initScrollToTop() {
    // Crear botón si no existe
    let scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) {
        scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Volver arriba');
        document.body.appendChild(scrollButton);
    }

    // Mostrar/ocultar botón optimizado con throttling
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });
    }

    // Usar passive listener para mejor rendimiento
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top suave
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Efecto visual al hacer clic
        scrollButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            scrollButton.style.transform = '';
        }, 150);
    });
}

// ===== DETECTOR DE ELEMENTOS FALTANTES (SOLO DEBUG) =====
function checkMissingAnimations() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const sections = [
            '.shipping-info',
            '.table-container',
            '.price-range',
            '.guide'
        ];

        sections.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            console.log(`🔍 ${selector}: ${elements.length} elementos encontrados`);

            elements.forEach((element, index) => {
                console.log(`${selector}[${index}]:`, {
                    inViewport: element.getBoundingClientRect().top < window.innerHeight,
                    hasAnimated: element.classList.contains('animated')
                });
            });
        });
    }
}

// ===== OPTIMIZACIONES DE RENDIMIENTO =====
function initPerformanceOptimizations() {
    // Prevenir múltiples inicializaciones
    if (window.ercatalogoInitialized) return;
    window.ercatalogoInitialized = true;

    // Agregar clase de loaded al body cuando todo esté listo
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// ===== MANEJO DE ERRORES =====
function initErrorHandling() {
    // Manejar errores globales
    window.addEventListener('error', (e) => {
        console.error('Error global:', e.error);
    });

    // Manejar promesas rechazadas
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promesa rechazada:', e.reason);
    });
}

// ===== INICIALIZACIÓN PRINCIPAL OPTIMIZADA =====
function initErCatalogo() {
    console.log('🚀 Inicializando ErCatálogo - Versión Mejorada...');

    // Optimizaciones de rendimiento
    initPerformanceOptimizations();

    // Manejo de errores
    initErrorHandling();

    // Inicializar funciones básicas
    initMenu();
    initTheme();
    initSmoothScroll();
    initLazyLoading();
    initVisitorCounter();
    initScrollToTop();

    // Animaciones optimizadas
    initialAnimation();

    // Debug solo en desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(checkMissingAnimations, 2000);
    }

    // Re-animar al cambiar de página (para SPA-like behavior)
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            setTimeout(() => {
                initialAnimation();
                // Re-inicializar lazy loading para nuevas imágenes
                initLazyLoading();
            }, 100);
        }
    });

    // Re-animar al redimensionar la ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initialAnimation();
        }, 250);
    });
}

// ===== INICIALIZACIÓN SEGURA =====
document.addEventListener('DOMContentLoaded', function () {
    // Esperar un frame para asegurar que el DOM esté completamente listo
    requestAnimationFrame(() => {
        setTimeout(initErCatalogo, 0);
    });
});

// ===== FUNCIONES GLOBALES PARA DESARROLLO =====
window.ErCatalogo = {
    // Recargar animaciones
    refreshAnimations: function () {
        document.querySelectorAll('.animated').forEach(el => {
            el.classList.remove('animated');
        });
        setTimeout(initialAnimation, 100);
        console.log('🔄 Animaciones recargadas');
    },

    // Alternar menú
    toggleMenu: function () {
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        if (menuToggle && navLinks) {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        }
    },

    // Alternar tema
    toggleTheme: function () {
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) themeToggle.click();
    },

    // Forzar modo oscuro
    forceDarkMode: function () {
        const html = document.getElementById("html-root");
        const themeToggle = document.getElementById("theme-toggle");
        html.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "true");
        if (themeToggle) themeToggle.textContent = "☀️";
    },

    // Forzar modo claro
    forceLightMode: function () {
        const html = document.getElementById("html-root");
        const themeToggle = document.getElementById("theme-toggle");
        html.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "false");
        if (themeToggle) themeToggle.textContent = "🌑";
    },

    // Estado del sistema
    getSystemInfo: function () {
        return {
            visitCount: localStorage.getItem('visitCount'),
            darkMode: localStorage.getItem('dark-mode'),
            prefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
            animatedElements: document.querySelectorAll('.animated').length,
            totalCards: document.querySelectorAll('.card').length
        };
    },

    // Debug de animaciones
    debugAnimations: function () {
        const elements = document.querySelectorAll('.card, .price-range, .section-title');
        console.log('🎯 Debug de Animaciones:');
        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            console.log(`Elemento ${index + 1}:`, {
                tag: el.tagName,
                class: el.className,
                inViewport: rect.top < window.innerHeight && rect.bottom > 0,
                hasAnimated: el.classList.contains('animated'),
                position: {
                    top: rect.top,
                    bottom: rect.bottom
                }
            });
        });
    }
};

// ===== POLYFILLS PARA COMPATIBILIDAD =====
// IntersectionObserver polyfill para navegadores antiguos
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver no soportado, cargando polyfill...');
    // Aquí podrías cargar un polyfill dinámicamente si es necesario
}

// requestAnimationFrame polyfill
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        return setTimeout(callback, 1000 / 60);
    };
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}

// ===== SERVICE WORKER (OPCIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Esto es opcional - puedes registrar un service worker para caching
        // navigator.serviceWorker.register('/sw.js')
        //   .then(registration => console.log('SW registered'))
        //   .catch(error => console.log('SW registration failed'));
    });
}

console.log('📦 ErCatálogo JS cargado correctamente');