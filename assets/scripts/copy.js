
window.copyToClipboard = function(button) {
    const codeElement = button.parentElement.querySelector('code');
    const textToCopy = codeElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
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
};
