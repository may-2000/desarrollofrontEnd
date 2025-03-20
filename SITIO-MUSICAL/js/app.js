// app.js - Código común para todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    const hamburguesa = document.querySelector('.hamburguesa');
    const navegacion = document.querySelector('.navegacion');
    const enlaces = document.querySelectorAll('.navegacion__enlace');
    const fecha = document.querySelector('.footer__texto');
    
    // Crear y añadir el botón de volver arriba
    const btnVolverArriba = document.createElement('div');
    btnVolverArriba.className = 'btn-volver-arriba';
    btnVolverArriba.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btnVolverArriba);
    
    // Inicializar funciones comunes
    mostrarMenu();
    cerrarMenu();
    fechaActual();
    scrollBtnVisibility();
    volverArriba();
    marcarPaginaActual();
    
    // Detectar la página actual e inicializar funciones específicas
    const path = window.location.pathname;
    
    // Inicio - Homepage (puede estar en index.html o ser la ruta raíz /)
    if (path.endsWith('/') || path.includes('index.html')) {
        // Inicialización para página de inicio
        console.log('Página de inicio cargada');
        
        // Ejemplo: Slider para la página de inicio
        const sliderImages = document.querySelectorAll('.inicio-slider img');
        let currentSlide = 0;
        
        // Función para cambiar entre imágenes del slider
        function changeSlide() {
            sliderImages.forEach(img => img.classList.remove('active'));
            currentSlide = (currentSlide + 1) % sliderImages.length;
            sliderImages[currentSlide].classList.add('active');
        }
        
        // Cambiar slide cada 5 segundos
        if (sliderImages.length > 0) {
            sliderImages[0].classList.add('active');
            setInterval(changeSlide, 5000);
        }
    }
    
    // Función para mostrar/ocultar el menú
    function mostrarMenu() {
        hamburguesa.addEventListener('click', () => {
            navegacion.classList.toggle('mostrar');
            hamburguesa.classList.toggle('activo');
        });
    }
    
    // Función para cerrar el menú al hacer clic en enlaces
    function cerrarMenu() {
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                // Si estamos en vista móvil
                if (window.innerWidth < 768) {
                    navegacion.classList.remove('mostrar');
                    hamburguesa.classList.remove('activo');
                }
            });
        });
    }
    
    // Función para actualizar el año en el footer
    function fechaActual() {
        let fechaHoy = new Date().getFullYear();
        if (fecha) {
            const textoFooter = fecha.textContent;
            fecha.textContent = textoFooter.replace(/\d{4}/, fechaHoy);
        }
    }
    
    // Función para mostrar/ocultar el botón de volver arriba
    function scrollBtnVisibility() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnVolverArriba.classList.add('visible');
            } else {
                btnVolverArriba.classList.remove('visible');
            }
        });
    }
    
    // Función para volver arriba al hacer clic en el botón
    function volverArriba() {
        btnVolverArriba.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Función para marcar la página actual en el menú
    function marcarPaginaActual() {
        const rutaActual = window.location.pathname;
        
        enlaces.forEach(enlace => {
            const rutaEnlace = enlace.getAttribute('href');
            
            if (rutaActual.includes(rutaEnlace) && rutaEnlace !== 'index.html') {
                enlace.style.color = 'var(--azul)';
                enlace.style.fontWeight = 'bold';
            } else if (rutaActual.endsWith('/') && rutaEnlace === 'index.html') {
                enlace.style.color = 'var(--azul)';
                enlace.style.fontWeight = 'bold';
            }
        });
    }
});