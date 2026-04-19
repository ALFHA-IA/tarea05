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

        const btn = contactForm.querySelector('button');
        btn.innerHTML = '<span>Generando Chat...</span> <i class="fas fa-circle-notch fa-spin"></i>';

        setTimeout(() => {
            window.open(url, '_blank');
            btn.innerHTML = '<span>Enviar a WhatsApp</span> <i class="fas fa-paper-plane"></i>';
            contactForm.reset();
        }, 1000);
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