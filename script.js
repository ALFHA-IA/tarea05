document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    document.body.style.overflow = 'hidden';

    const hidePreloader = () => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    window.addEventListener('load', () => setTimeout(hidePreloader, 2400));
    setTimeout(hidePreloader, 5000);

    const cursor         = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top  = mouseY + 'px';
        });

        (function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top  = followerY + 'px';
            requestAnimationFrame(animateFollower);
        })();

        document.querySelectorAll('a, button, .service-card, .team-card, .testimonial-card, .faq-question, .valor-card, .award-card')
            .forEach(el => {
                el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorFollower.classList.add('hover'); });
                el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorFollower.classList.remove('hover'); });
            });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    const menuToggle = document.getElementById('menuToggle');
    const navLinks   = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', e => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
            }
        });
    });

    const sections    = document.querySelectorAll('section[id], header[id]');
    const navLinkEls  = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id'); });
        navLinkEls.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
    }, { passive: true });

    const aosObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(entry.target.dataset.aosDelay) || 0);
                aosObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));

    function animateCounter(el, target, duration) {
        const start = performance.now();
        const update = ts => {
            const p = Math.min((ts - start) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(e * target);
            if (p < 1) requestAnimationFrame(update);
            else el.textContent = target;
        };
        requestAnimationFrame(update);
    }

    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.dataset.target), 2000);
                counterObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(c => counterObs.observe(c));

    setTimeout(() => {
        document.querySelectorAll('.mini-number').forEach(el => animateCounter(el, parseInt(el.dataset.count), 1600));
    }, 3300);

    const particlesContainer = document.getElementById('particles');
    function createParticle() {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 3 + 2;
        p.style.cssText = `left:${Math.random()*100}%;animation-duration:${Math.random()*12+12}s;animation-delay:${Math.random()*4}s;width:${size}px;height:${size}px;opacity:${Math.random()*0.25+0.05};`;
        particlesContainer.appendChild(p);
        setTimeout(() => p.remove(), 20000);
    }
    for (let i = 0; i < 25; i++) setTimeout(createParticle, i * 150);
    setInterval(createParticle, 1200);

    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top  - r.height / 2;
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
        });
    }

    if (window.matchMedia('(hover: none)').matches) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', () => card.classList.toggle('flipped'));
            const btn = card.querySelector('.btn-service');
            if (btn) btn.addEventListener('click', e => e.stopPropagation());
        });
    }

    (function initTestimonials() {
        const track       = document.getElementById('testimonialsTrack');
        const prevBtn     = document.getElementById('testimonialPrev');
        const nextBtn     = document.getElementById('testimonialNext');
        const dotsWrap    = document.getElementById('testimonialDots');
        const progressBar = document.getElementById('testimonialsProgress');
        const counterEl   = document.querySelector('.tc-current');

        if (!track) return;

        const cards = Array.from(track.querySelectorAll('.testimonial-card'));
        const TOTAL = cards.length;
        let current = 0;
        let autoTimer = null;
        const AUTOPLAY_DELAY = 5500;

        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
            dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
            dotsWrap.appendChild(dot);
        });
        const dots = dotsWrap.querySelectorAll('.testimonial-dot');

        function getSlidesVisible() {
            if (window.innerWidth <= 768)  return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function getCardWidth() {
            return cards[0].getBoundingClientRect().width + 32;
        }

        function clampIndex(idx) {
            const spv = getSlidesVisible();
            const max = Math.max(0, TOTAL - spv);
            return Math.max(0, Math.min(idx, max));
        }

        function updateUI() {
            const spv  = getSlidesVisible();
            const max  = Math.max(0, TOTAL - spv);

            track.style.transform = `translateX(-${current * getCardWidth()}px)`;

            dots.forEach((d, i) => d.classList.toggle('active', i === current));

            const pct = max === 0 ? 100 : (current / max) * 100;
            if (progressBar) progressBar.style.width = pct + '%';

            if (counterEl) {
                const num = (current + 1).toString().padStart(2, '0');
                counterEl.textContent = num;
                // Pop animation
                counterEl.style.transform = 'scale(1.15)';
                counterEl.style.color = 'var(--gold-light)';
                setTimeout(() => {
                    counterEl.style.transform = 'scale(1)';
                    counterEl.style.color = 'var(--gold)';
                }, 250);
            }

            if (prevBtn) prevBtn.disabled = current === 0;
            if (nextBtn) nextBtn.disabled = current >= max;
        }

        function goTo(idx) {
            current = clampIndex(idx);
            updateUI();
        }

        function next() {
            const spv = getSlidesVisible();
            const max = Math.max(0, TOTAL - spv);
            goTo(current >= max ? 0 : current + 1);
        }

        function prev() {
            const spv = getSlidesVisible();
            const max = Math.max(0, TOTAL - spv);
            goTo(current <= 0 ? max : current - 1);
        }

        function startAuto() {
            stopAuto();
            autoTimer = setInterval(next, AUTOPLAY_DELAY);
        }

        function stopAuto() {
            if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);

        let touchStartX = 0;
        track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                stopAuto();
                diff > 0 ? next() : prev();
                startAuto();
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft')  { stopAuto(); prev(); startAuto(); }
            if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
        });

        window.addEventListener('resize', () => goTo(current));

        // Init
        updateUI();
        startAuto();
    })();

    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            const nombre      = document.getElementById('nombre').value.trim();
            const email       = document.getElementById('email').value.trim();
            const telefono    = document.getElementById('telefono').value.trim();
            const especialidad = document.getElementById('especialidad').value;
            const mensaje     = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !telefono || !especialidad || !mensaje) {
                showFormError('Por favor complete todos los campos.');
                return;
            }

            const labels = { corporativo:'Asesoría Corporativa', civil:'Derecho Civil', penal:'Defensa Penal', laboral:'Derecho Laboral', administrativo:'Derecho Administrativo', arbitraje:'Arbitraje y Mediación', inmobiliario:'Derecho Inmobiliario', tributario:'Derecho Tributario', otro:'Consulta General' };
            const esp = labels[especialidad] || especialidad;
            const msg = encodeURIComponent(`*📋 Nueva Consulta Legal — HDU Abogados*\n\n👤 *Nombre:* ${nombre}\n📧 *Email:* ${email}\n📱 *Teléfono:* ${telefono}\n⚖️ *Área:* ${esp}\n💬 *Mensaje:*\n${mensaje}\n\n_Enviado desde el sitio web de HDU Abogados_`);

            const btn = contactForm.querySelector('.btn-submit');
            const orig = btn.innerHTML;
            btn.innerHTML = '<span>Abriendo WhatsApp...</span><i class="fas fa-circle-notch fa-spin"></i>';
            btn.disabled  = true;
            btn.style.opacity = '0.8';

            setTimeout(() => {
                window.open(`https://wa.me/51985493757?text=${msg}`, '_blank');
                btn.innerHTML = '<span>¡Mensaje enviado!</span><i class="fas fa-check"></i>';
                btn.style.background = '#10B981';
                btn.style.opacity = '1';
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = btn.style.opacity = '';
                    btn.disabled = false;
                    contactForm.reset();
                    const sel = document.getElementById('especialidad');
                    if (sel) { sel.selectedIndex = 0; sel.classList.remove('has-value'); const lbl = sel.parentElement.querySelector('.select-label'); if (lbl) lbl.classList.remove('active-label'); }
                }, 3000);
            }, 900);
        });

        function showFormError(msg) {
            let err = contactForm.querySelector('.form-error');
            if (!err) {
                err = document.createElement('p');
                err.classList.add('form-error');
                err.style.cssText = 'color:#EF4444;font-size:0.8rem;text-align:center;margin-bottom:1rem;';
                contactForm.querySelector('.btn-submit').before(err);
            }
            err.textContent = msg;
            setTimeout(() => err.remove(), 3000);
        }
    }

    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500), { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const hero = document.querySelector('.hero-premium');
    if (hero && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight)
                hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.4}px)`;
        }, { passive: true });
    }

    document.querySelectorAll('.btn-gold, .btn-submit, .btn-cta').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const r = this.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            const ripple = document.createElement('span');
            ripple.style.cssText = `position:absolute;background:rgba(255,255,255,0.25);border-radius:50%;pointer-events:none;left:${x}px;top:${y}px;width:10px;height:10px;margin:-5px 0 0 -5px;animation:rippleEffect 0.65s ease-out forwards;`;
            this.style.position = 'relative'; this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });
    const ripStyle = document.createElement('style');
    ripStyle.textContent = '@keyframes rippleEffect{to{transform:scale(30);opacity:0;}}';
    document.head.appendChild(ripStyle);

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }, idx * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.feature-item, .process-step, .team-card, .valor-card, .award-card').forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
        revealObs.observe(el);
    });
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        let i = 0;
        const type = () => { if (i < text.length) { tagline.textContent += text.charAt(i++); setTimeout(type, 55); } };
        setTimeout(type, 2100);
    }

    document.querySelectorAll('.select-field select').forEach(sel => {
        sel.addEventListener('change', function() {
            const lbl = this.parentElement.querySelector('.select-label');
            if (this.value) { this.classList.add('has-value'); if (lbl) lbl.classList.add('active-label'); }
            else            { this.classList.remove('has-value'); if (lbl) lbl.classList.remove('active-label'); }
        });
    });

    document.querySelectorAll('.floating-field input, .floating-field textarea, .floating-field select').forEach(el => {
        el.addEventListener('focus', function() { this.closest('.floating-field').style.transform = 'scale(1.01)'; });
        el.addEventListener('blur',  function() { this.closest('.floating-field').style.transform = 'scale(1)'; });
    });

    const trustBar = document.querySelector('.trust-bar');
    if (trustBar) {
        trustBar.style.cssText += 'opacity:0;transform:translateY(40px);transition:opacity 0.9s ease,transform 0.9s ease;';
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 }).observe(trustBar);
    }

    console.log('%c ⚖️ HDU Abogados ', 'background:#C9A84C;color:#0C1018;font-size:20px;font-weight:bold;padding:10px 20px;border-radius:4px;font-family:Georgia,serif;');
    console.log('%c Urquiaga · Diaz · Huamaní — Excelencia Jurídica desde 2009', 'color:#C9A84C;font-size:13px;');
    console.log('%c Trujillo, La Libertad, Perú | +51 985 493 757', 'color:#8B99B5;font-size:11px;');
});