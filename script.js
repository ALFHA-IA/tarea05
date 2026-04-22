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

    // ============================================
    // 6. ACTIVE NAV LINK
    // ============================================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // 7. ANIMACIONES AL SCROLL (AOS custom)
    // ============================================
    const aosElements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                aosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));

    // ============================================
    // 8. CONTADORES ANIMADOS
    // ============================================
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Hero mini counters
    const miniCounters = document.querySelectorAll('.mini-number');

    setTimeout(() => {
        miniCounters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            const updateMini = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateMini);
                } else {
                    counter.textContent = target;
                }
            };

            updateMini();
        });
    }, 3500);

    // ============================================
    // 9. PARTÍCULAS EN HERO
    // ============================================
    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 20000);
    }

    for (let i = 0; i < 30; i++) {
        setTimeout(createParticle, i * 200);
    }

    setInterval(createParticle, 1000);

    // ============================================
    // 10. MAGNETIC BUTTONS
    // ============================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    if (window.matchMedia('(pointer: fine)').matches) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============================================
    // 11. TESTIMONIALS SLIDER
    // ============================================
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    let currentSlide = 0;
    const totalSlides = cards.length;

    // Crear dots
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function goToSlide(index) {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;

        currentSlide = Math.max(0, Math.min(index, maxSlide));

        const cardWidth = cards[0].offsetWidth + 32; // gap
        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto-play
    let autoPlayInterval = setInterval(() => {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;

        if (currentSlide >= maxSlide) {
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }, 5000);

    // Pausar en hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            const slidesPerView = getSlidesPerView();
            const maxSlide = totalSlides - slidesPerView;
            if (currentSlide >= maxSlide) {
                goToSlide(0);
            } else {
                goToSlide(currentSlide + 1);
            }
        }, 5000);
    });

    window.addEventListener('resize', () => goToSlide(currentSlide));

    // ============================================
    // 12. WHATSAPP FORM
    // ============================================
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const especialidad = document.getElementById('especialidad').value;
        const mensaje = document.getElementById('mensaje').value;

        const numeroWhatsApp = "51985493757";

        const especialidades = {
            'corporativo': 'Asesoría Corporativa',
            'civil': 'Derecho Civil',
            'penal': 'Defensa Penal',
            'laboral': 'Derecho Laboral',
            'administrativo': 'Derecho Administrativo',
            'arbitraje': 'Arbitraje y Mediación'
        };

        const especialidadTexto = especialidades[especialidad] || 'No especificada';

        const mensajeTexto = `*Nueva Consulta Legal - HDU Abogados*%0A%0A` +
            `*Nombre:* ${nombre}%0A` +
            `*Email:* ${email}%0A` +
            `*Teléfono:* ${telefono}%0A` +
            `*Especialidad:* ${especialidadTexto}%0A` +
            `*Mensaje:* ${mensaje}%0A%0A` +
            `_Enviado desde hduabogados.pe_`;

        const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeTexto}`;

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Generando Chat...</span> <i class="fas fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            window.open(url, '_blank');
            btn.innerHTML = '<span>¡Enviado!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#10B981';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1000);
    });

    // ============================================
    // 13. BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 14. PARALLAX SUAVE EN HERO
    // ============================================
    const hero = document.querySelector('.hero-premium');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });

    // ============================================
    // 15. RIPPLE EFFECT EN BOTONES
    // ============================================
    document.querySelectorAll('.btn-gold, .btn-submit').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Agregar keyframe para ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    // ============================================
    // 16. TILT EFFECT EN TARJETAS DE SERVICIOS
    // ============================================
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.querySelector('.service-card-inner').style.transform =
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.querySelector('.service-card-inner').style.transform = '';
            });
        });
    }

    // ============================================
    // 17. SCROLL REVEAL PARA ELEMENTOS ADICIONALES
    // ============================================
    const revealElements = document.querySelectorAll('.feature-item, .process-step, .team-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ============================================
    // 18. EFECTO DE ESCRITURA EN TAGLINE
    // ============================================
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };

        setTimeout(typeWriter, 2000);
    }

    // ============================================
    // 19. ANIMACIÓN DE ENTRADA PARA EL TRUST BAR
    // ============================================
    const trustBar = document.querySelector('.trust-bar');

    if (trustBar) {
        const trustObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    trustObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        trustBar.style.opacity = '0';
        trustBar.style.transform = 'translateY(50px)';
        trustBar.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        trustObserver.observe(trustBar);
    }

    // ============================================
    // 20. EFECTO GLOW EN INPUTS AL FOCUS
    // ============================================
    document.querySelectorAll('.floating-field input, .floating-field textarea').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    console.log('%c HDU Abogados ', 'background: #D4AF37; color: #0A0F1A; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
    console.log('%c Sitio web cargado exitosamente ✓', 'color: #D4AF37; font-size: 14px;');
});