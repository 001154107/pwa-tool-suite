if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

const toolList = document.getElementById('tool-list');

// This is a placeholder. In a real scenario, you might fetch this from a file or have a build step.
const tools = [
    // Example: { "name": "My Cool Tool", "url": "tools/my-cool-tool.html" }
];

tools.forEach(tool => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = tool.url;
    link.textContent = tool.name;
    listItem.appendChild(link);
    toolList.appendChild(listItem);
});