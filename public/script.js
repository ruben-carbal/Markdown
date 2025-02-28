window.onload = function() {
    const converter = new showdown.Converter();
    const pad = document.getElementById('pad');

    let previousMarkdownValue;
    let markdownArea = document.getElementById('markdown');

    // arreglar el tab
    pad.addEventListener('keydown', e => {
        if (e.key == 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const target = e.target;
            const value = target.value;

            target.value = value.substring(0, start) + "\t";
        }
    })

    const convertTextAreaToMarkdown = () => {
        const markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    }

    setInterval(() => {
        if (previousMarkdownValue != pad.value) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    // hacer que home page no muestre texto guardado
    if (document.location.pathname > 1) {
        const documentName = document.location.pathname.substring(1); // basicamente le quitamos / al pathname

        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });

    }

    convertTextAreaToMarkdown();

    // si no funcioná document.location.pathname al final recuerda cambiarlo por 'home'
}
