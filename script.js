document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2000);
    });

    document.body.style.overflow = 'hidden';

    // ============================================
    // 2. CURSOR PERSONALIZADO (CORREGIDO)
    // ============================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (window.matchMedia('(pointer: fine)').matches) {
        // Inicializamos fuera de la pantalla o invisibles
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        let isVisible = false; // Control de visibilidad inicial

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Si es el primer movimiento, los hacemos visibles
            if (!isVisible) {
                cursor.style.opacity = "1";
                cursorFollower.style.opacity = "1";
                isVisible = true;
            }
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Desaparecer si el mouse sale de la página
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = "0";
            cursorFollower.style.opacity = "0";
            isVisible = false;
        });

        // Reaparecer al entrar
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = "1";
            cursorFollower.style.opacity = "1";
            isVisible = true;
        });

        // Hover effects (se mantiene igual)
        const hoverElements = document.querySelectorAll('a, button, .service-card, .team-card, .testimonial-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // ============================================
    // 3. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // 4. MENÚ MÓVIL
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // 5. SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });