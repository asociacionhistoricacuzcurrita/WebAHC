// ===================================
// FUNCIONALIDAD DEL MENÚ HAMBURGUESA
// ===================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===================================
// FUNCIONALIDAD DE LA GALERÍA
// ===================================

// Array de imágenes de ejemplo (placeholder)
// Cuando subas imágenes reales, actualiza estas rutas
const imagenesPatrimonioCultural = [
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Cultural+1', title: 'Patrimonio Cultural 1' },
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Cultural+2', title: 'Patrimonio Cultural 2' },
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Cultural+3', title: 'Patrimonio Cultural 3' },
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Cultural+4', title: 'Patrimonio Cultural 4' }
];

const imagenesPatrimonioArquitectonico = [
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Arquitectónico+1', title: 'Patrimonio Arquitectónico 1' },
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Arquitectónico+2', title: 'Patrimonio Arquitectónico 2' },
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Arquitectónico+3', title: 'Patrimonio Arquitectónico 3' },
    { url: 'https://via.placeholder.com/300?text=Patrimonio+Arquitectónico+4', title: 'Patrimonio Arquitectónico 4' }
];

// Función para cargar las galerías
function cargarGaleria(contenedorId, imagenes) {
    const contenedor = document.getElementById(contenedorId);
    imagenes.forEach(imagen => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${imagen.url}" alt="${imagen.title}" data-title="${imagen.title}">`;
        item.addEventListener('click', () => abrirModal(imagen.url, imagen.title));
        contenedor.appendChild(item);
    });
}

// Cargar ambas galerías
cargarGaleria('galeria-cultural', imagenesPatrimonioCultural);
cargarGaleria('galeria-arquitectonico', imagenesPatrimonioArquitectonico);

// ===================================
// FUNCIONALIDAD DEL MODAL
// ===================================

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

function abrirModal(imagenSrc, titulo) {
    modal.classList.add('active');
    modalImage.src = imagenSrc;
    caption.textContent = titulo;
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', cerrarModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        cerrarModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
        cerrarModal();
    }
});

// ===================================
// ANIMACIONES AL SCROLL
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que requieren animación
document.querySelectorAll('.gallery-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// SUAVIDAD EN NAVEGACIÓN
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// DETECTAR CAMBIOS EN IMÁGENES
// ===================================

// Esta función verifica periódicamente si hay nuevas imágenes en las carpetas
// (útil si añades imágenes directamente en GitHub)
function actualizarGalerias() {
    console.log('Galerías cargadas. Añade nuevas imágenes en:');
    console.log('- images/patrimonio-cultural/');
    console.log('- images/patrimonio-arquitectonico/');
}

// Llamar a la función al cargar la página
window.addEventListener('load', actualizarGalerias);

console.log('✅ Scripts cargados correctamente');
