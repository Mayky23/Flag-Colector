// Función para copiar comandos
function copyToClipboard(button) {
    const codeElement = button.nextElementSibling;
    const textToCopy = codeElement.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Feedback visual
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#00ff00';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}