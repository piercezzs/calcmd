const fs = require('fs');

fs.readFile('example.md', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const processedData = processData(data);

    fs.writeFile('processed_example.md', processedData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Markdown文件处理完成！');
    });
});

function processData (data) {
    const uniqueLines = new Set();
    const lines = data.split('\n');

    lines.forEach(line => {
        line = line.replace(/<!--(.+?)-->/g, '').trim();

        line = line.replace(/<!--(.+?)-->\s*([\u4e00-\u9fa5]+)\s*-->/g, '$2').trim();

        line = line.replace(/《([\u4e00-\u9fa5]+)》/g, '$1').trim();

        if (line.trim() !== '') {
            uniqueLines.add(line);
        }
    });

    return Array.from(uniqueLines).join('\n');
}