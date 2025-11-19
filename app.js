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

// Fetch tools from the generated JSON file
fetch('tools.json')
    .then(response => response.json())
    .then(tools => {
        tools.forEach(tool => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = tool.url;
            link.textContent = tool.name;
            listItem.appendChild(link);
            toolList.appendChild(listItem);
        });
    })
    .catch(err => console.error('Error loading tools:', err));