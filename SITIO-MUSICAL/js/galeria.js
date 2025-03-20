// galeria.js - Funcionalidades específicas para la página de galería
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const btnAnterior = document.getElementById('anterior');
    const btnSiguiente = document.getElementById('siguiente');
    const imagenActual = document.getElementById('imagen-actual');
    const imagenTotal = document.getElementById('imagen-total');
    
    // Variables
    let imagenSeleccionada = 0;
    const imagenes = Array.from(galeriaItems).map(item => {
        return {
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt,
            title: item.dataset.title,
            description: item.dataset.description
        };
    });
    
    // Inicializar contador
    imagenTotal.textContent = imagenes.length;
    
    // Funciones
    function abrirModal(index) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        actualizarImagen(index);
        modal.classList.add('fadeIn');
    }
    
    function cerrarModalFunc() {
        modal.classList.remove('fadeIn');
        modal.classList.add('fadeOut');
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fadeOut');
            document.body.style.overflow = ''; // Restaurar scroll
        }, 300);
    }
    
    function actualizarImagen(index) {
        // Asegurar que el índice esté dentro del rango
        if (index < 0) {
            imagenSeleccionada = imagenes.length - 1;
        } else if (index >= imagenes.length) {
            imagenSeleccionada = 0;
        } else {
            imagenSeleccionada = index;
        }
        
        // Actualizar imagen, título, descripción y contador
        modalImg.src = imagenes[imagenSeleccionada].src;
        modalImg.alt = imagenes[imagenSeleccionada].alt;
        modalTitulo.textContent = imagenes[imagenSeleccionada].title || '';
        modalDescripcion.textContent = imagenes[imagenSeleccionada].description || '';
        imagenActual.textContent = imagenSeleccionada + 1;
        
        // Animación de transición
        modalImg.classList.add('fadeIn');
        setTimeout(() => {
            modalImg.classList.remove('fadeIn');
        }, 300);
    }
    
    function mostrarAnterior() {
        actualizarImagen(imagenSeleccionada - 1);
    }
    
    function mostrarSiguiente() {
        actualizarImagen(imagenSeleccionada + 1);
    }
    
    // Event Listeners
    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            abrirModal(index);
        });
    });
    
    cerrarModal.addEventListener('click', cerrarModalFunc);
    
    btnAnterior.addEventListener('click', mostrarAnterior);
    btnSiguiente.addEventListener('click', mostrarSiguiente);
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                cerrarModalFunc();
            } else if (e.key === 'ArrowLeft') {
                mostrarAnterior();
            } else if (e.key === 'ArrowRight') {
                mostrarSiguiente();
            }
        }
    });
    
    // Cerrar modal haciendo clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModalFunc();
        }
    });
    
    // Efecto hover para elementos de galería
    galeriaItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.zIndex = '1';
        });
    });
    
    // Lazy loading para imágenes (aunque HTML ya tiene el atributo loading="lazy")
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('fadeIn');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('.galeria-item img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});