document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    // 1. Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });



    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        const numeroWhatsApp = "51985493757";

        const mensajeTexto = `*Nueva Consulta Legal - HDU Abogados*%0A%0A` +
            `*Nombre:* ${nombre}%0A` +
            `*Email:* ${email}%0A` +
            `*Teléfono:* ${telefono}%0A` +
            `*Mensaje:* ${mensaje}`;

        const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeTexto}`;

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70, // Ajuste por el header pegajoso
                        behavior: 'smooth'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                nav.style.background = '#050c18';
                nav.style.padding = '15px 10%';
            } else {
                nav.style.background = '#0a192f';
                nav.style.padding = '20px 10%';
            }
        });