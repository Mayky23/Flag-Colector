const fs = require('fs');
const path = require('path');
const marked = require('marked');
const hljs = require('highlight.js');

// Configurar marked
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code).value;
        }
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

// Leer el CSS
const css = fs.readFileSync(path.join(__dirname, '../writeup.css'), 'utf8');

// Plantilla HTML base
const htmlTemplate = (content, title) => `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Hacking Vault</title>
    <style>${css}</style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="writeup-container">
        ${content}
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
</body>
</html>`;

// Procesar todos los archivos .md en la carpeta writeups
const processMarkdownFiles = () => {
    const writeupsDir = path.join(__dirname, '../writeups');
    const files = fs.readdirSync(writeupsDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    if (mdFiles.length === 0) {
        console.log('No se encontraron archivos .md en la carpeta writeups');
        return;
    }
    
    mdFiles.forEach(file => {
        const filePath = path.join(writeupsDir, file);
        const mdContent = fs.readFileSync(filePath, 'utf8');
        const htmlContent = marked(mdContent);
        const title = file.replace('.md', '');
        const finalHtml = htmlTemplate(htmlContent, title);
        
        const outputFile = path.join(writeupsDir, `${title}.html`);
        fs.writeFileSync(outputFile, finalHtml);
        console.log(`Convertido: ${file} → ${title}.html`);
    });
    
    console.log(`\nProceso completado. ${mdFiles.length} archivos convertidos.`);
};

// Ejecutar la conversión
processMarkdownFiles();