window.onload = function() {
    const converter = new showdown.Converter();
    const pad = document.getElementById('pad');
    let markdownArea = document.getElementById('markdown');

    const convertTextAreaToMarkdown = () => {
        const markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    }

    pad.addEventListener('input', convertTextAreaToMarkdown);

    sharejs.open('home', 'text', function(error, doc) {
        doc.attach_textarea(pad);
    });
}
