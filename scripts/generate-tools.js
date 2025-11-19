const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../tools');
const outputFile = path.join(__dirname, '../tools.json');

// Helper to format name: "my-cool-tool.html" -> "My Cool Tool"
const formatName = (filename) => {
    const name = path.parse(filename).name;
    return name
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

try {
    if (!fs.existsSync(toolsDir)) {
        console.error('Tools directory not found!');
        process.exit(1);
    }

    const files = fs.readdirSync(toolsDir);
    const tools = files
        .filter(file => file.endsWith('.html'))
        .map(file => ({
            name: formatName(file),
            url: `tools/${file}`
        }));

    fs.writeFileSync(outputFile, JSON.stringify(tools, null, 2));
    console.log(`Generated tools.json with ${tools.length} tools.`);
} catch (err) {
    console.error('Error generating tools list:', err);
    process.exit(1);
}
