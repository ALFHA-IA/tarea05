document.addEventListener('DOMContentLoaded', () => {
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.databaset.tab;

            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            link.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    const modal = document.getElementById('modal-contacto');
    const btnOpen = document.getElementById('btn-modal');
    const btnClose = document.querySelector('.close-modal');

    btnOpen.onclick = () => modal.style.display = 'flex';
    btnClose.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }

    document.getElementById('form-legal').onsubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado con éxito. Un abogado se contactará pronto.');
        modal.style.display = 'none';
    };
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {        e.preventDefault();
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