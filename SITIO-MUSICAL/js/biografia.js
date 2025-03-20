// biografia.js - Código específico para la página de biografía
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que estamos en la página de biografía
    if (!window.location.pathname.includes('biografia.html')) return;
    
    console.log('Página de biografía inicializada correctamente');
    
    // Mostrar/ocultar secciones de la biografía
    const toggleBtns = document.querySelectorAll('.biografia-toggle');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.toggle('mostrar');
                this.textContent = targetSection.classList.contains('mostrar') ? 
                    'Leer menos' : 'Leer más';
            }
        });
    });
    
    // Animación de aparición para elementos de la biografía
    const bioSections = document.querySelectorAll('.bio-section');
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para manejar las animaciones al hacer scroll
    function handleScrollAnimations() {
        bioSections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animado')) {
                section.classList.add('animado');
            }
        });
    }
    
    // Ejecutar una vez al cargar la página
    handleScrollAnimations();
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', handleScrollAnimations);
});