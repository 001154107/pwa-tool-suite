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

// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    lightIcon.classList.remove('hidden');
} else {
    darkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
    // toggle icons inside button
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    } else {
        // if NOT set via local storage previously
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
});