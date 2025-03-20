
document.addEventListener('DOMContentLoaded', function() {
    // Función para eliminar botones por texto
    function removeButtonsByText() {
        // Seleccionar todos los enlaces y botones
        const elements = document.querySelectorAll('a, button');
        
        // Recorrer todos los elementos y ocultar los que contengan el texto específico
        elements.forEach(element => {
            const text = element.textContent.trim().toLowerCase();
            if (text === 'ver menos' || text === 'ver demo') {
                element.style.display = 'none';
            }
        });
    }
    
    // Ejecutar la función al cargar la página
    removeButtonsByText();
    
    // Ejecutar periódicamente para asegurar que se aplique a elementos cargados dinámicamente
    setInterval(removeButtonsByText, 1000);
});