window.onload = function() {
    const converter = new showdown.Converter();
    const pad = document.getElementById('pad');

    let previousMarkdownValue;
    let markdownArea = document.getElementById('markdown');

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

    sharejs.open('home', 'text', function(error, doc) {
        doc.attach_textarea(pad);
        convertTextAreaToMarkdown();
    });
}
