// videos.js - Código específico para la página de videos
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que estamos en la página de videos
    if (!window.location.pathname.includes('videos.html')) return;
    
    console.log('Página de videos inicializada correctamente');
    
    // Obtener todos los links de video
    const videoLinks = document.querySelectorAll('.galeria-videos a');
    
    // Asegurarse de que existan todas las imágenes en miniatura para videos
    document.querySelectorAll('.video-miniatura img').forEach(img => {
        img.addEventListener('error', function() {
            // Si la imagen no se encuentra, usar una de respaldo
            this.src = 'img/videos/placeholder.jpg'; 
            this.alt = 'Miniatura no disponible';
        });
    });
    
    // Para cada link de video
    videoLinks.forEach(link => {
        // Agregar evento de clic
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener la URL del video
            let videoUrl = this.getAttribute('href');
            const videoTitle = this.querySelector('.video-titulo').textContent;
            
            // Convertir URL de YouTube al formato de incrustación
            // Extraer el ID del video y cualquier parámetro de tiempo
            let videoId = '';
            let startTime = '';
            
            // Manejar URLs en formato youtu.be
            if (videoUrl.includes('youtu.be')) {
                const urlParts = videoUrl.split('/');
                const lastPart = urlParts[urlParts.length - 1];
                
                // Verificar si tiene parámetro de tiempo
                if (lastPart.includes('?')) {
                    const paramParts = lastPart.split('?');
                    videoId = paramParts[0];
                    
                    // Extraer el tiempo si existe
                    if (paramParts[1].includes('t=')) {
                        startTime = '&start=' + paramParts[1].split('t=')[1];
                    }
                } else {
                    videoId = lastPart;
                }
            }
            // Manejar URLs en formato youtube.com/watch
            else if (videoUrl.includes('youtube.com/watch')) {
                const urlParams = new URLSearchParams(new URL(videoUrl).search);
                videoId = urlParams.get('v');
                
                if (urlParams.has('t')) {
                    startTime = '&start=' + urlParams.get('t');
                }
            }
            
            // Crear la URL de incrustación
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1${startTime}`;
            
            // Crear el modal de video
            const videoModal = document.createElement('div');
            videoModal.className = 'video-modal';
            
            // Contenido del modal
            videoModal.innerHTML = `
                <div class="video-modal-content">
                    <span class="video-modal-close">&times;</span>
                    <iframe width="100%" height="100%" src="${embedUrl}" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `;
            
            // Agregar el modal al body
            document.body.appendChild(videoModal);
            
            // Registrar evento de visualización
            console.log(`Video visualizado: ${videoTitle}`);
            
            // Bloquear el scroll del body
            document.body.style.overflow = 'hidden';
            
            // Mostrar el modal
            setTimeout(() => {
                videoModal.classList.add('active');
            }, 10);
            
            // Evento para cerrar el modal
            const closeBtn = videoModal.querySelector('.video-modal-close');
            closeBtn.addEventListener('click', closeVideoModal);
            
            // Cerrar modal al hacer clic fuera del contenido
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });
            
            // Cerrar modal con tecla ESC
            document.addEventListener('keydown', function escKeyPress(e) {
                if (e.key === 'Escape') {
                    closeVideoModal();
                    document.removeEventListener('keydown', escKeyPress);
                }
            });
            
            // Función para cerrar el modal
            function closeVideoModal() {
                videoModal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(videoModal);
                    document.body.style.overflow = '';
                }, 300);
            }
        });
        
        // Mejorar la interactividad: efecto hover en miniaturas
        const miniatura = link.querySelector('.video-miniatura');
        
        // Efecto al pasar el mouse
        link.addEventListener('mouseenter', () => {
            miniatura.querySelector('.video-play').style.opacity = '1';
        });
        
        // Efecto al quitar el mouse
        link.addEventListener('mouseleave', () => {
            miniatura.querySelector('.video-play').style.opacity = '0.8';
        });
    });
    
    // Función para cargar imágenes de vista previa de YouTube cuando se hace scrolling
    const cargarImagenesLazy = () => {
        const videoMiniaturas = document.querySelectorAll('.video-miniatura img');
        
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        videoMiniaturas.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    };
    
    // Iniciar carga lazy de imágenes
    if ('IntersectionObserver' in window) {
        cargarImagenesLazy();
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        document.querySelectorAll('.video-miniatura img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Hacer que las miniaturas sean responsivas
    function resizeVideoThumbnails() {
        const containerWidth = document.querySelector('.galeria-videos').offsetWidth;
        const columns = window.innerWidth > 768 ? Math.floor(containerWidth / 300) : window.innerWidth > 480 ? 2 : 1;
        const itemWidth = containerWidth / columns;
        const itemHeight = itemWidth * 0.56; // Relación de aspecto 16:9
        
        document.querySelectorAll('.video-miniatura').forEach(miniatura => {
            // Ajustar el tamaño de las miniaturas según el ancho de la pantalla
            if (window.innerWidth <= 480) {
                miniatura.style.paddingBottom = '56.25%'; // Mantener relación 16:9
            }
        });
    }

    // Ejecutar la función de redimensionamiento al cargar y al cambiar el tamaño de la ventana
    resizeVideoThumbnails();
    window.addEventListener('resize', resizeVideoThumbnails);
    
    // Filtrar videos por categoría
    const filtroVideos = document.querySelectorAll('.filtro-videos button');
    const todosVideos = document.querySelectorAll('.video-item');
    
    if (filtroVideos.length > 0) {
        filtroVideos.forEach(btn => {
            btn.addEventListener('click', function() {
                // Quitar clase activa a todos los botones
                filtroVideos.forEach(b => b.classList.remove('activo'));
                // Añadir clase activa al botón seleccionado
                this.classList.add('activo');
                
                const categoria = this.getAttribute('data-categoria');
                
                // Filtrar videos
                todosVideos.forEach(video => {
                    if (categoria === 'todos' || video.getAttribute('data-categoria') === categoria) {
                        video.style.display = 'block';
                    } else {
                        video.style.display = 'none';
                    }
                });
                
                // Ajustar tamaño de miniaturas después de filtrar
                setTimeout(resizeVideoThumbnails, 100);
            });
        });
    }
});