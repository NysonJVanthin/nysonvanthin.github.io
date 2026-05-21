// 1. RUNS INSTANTLY: Blocks the page from loading light mode if dark mode is active
(function preBootTheme() {
    let savedTheme = localStorage.getItem('furina-theme');
    
    // If no preference is saved yet, lock it to ousia
    if (!savedTheme) {
        savedTheme = 'ousia';
        localStorage.setItem('furina-theme', 'ousia');
    }
    
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// 2. RUNS AS SOON AS THE BUTTONS ARE CREATED: Fixes the labels
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('furina-theme') || 'ousia';
    const body = document.body;
    const formText = document.getElementById('form-text');

    body.setAttribute('data-theme', savedTheme);

    if (formText) {
        formText.textContent = savedTheme === 'ousia' ? "Pneuma Form" : "Ousia Form";
    }
});

// 3. RADIAL MENU TOGGLE
function toggleMenu() {
    const nav = document.getElementById('genshinNav');
    const body = document.body;
    const hubIcon = document.getElementById('hub-icon');
    
    if (!nav) return;

    nav.classList.toggle('open');
    body.classList.toggle('menu-active');
    
    if (nav.classList.contains('open')) {
        hubIcon.classList.remove('fa-map');
        hubIcon.classList.add('fa-compass');
    } else {
        hubIcon.classList.remove('fa-compass');
        hubIcon.classList.add('fa-map');
    }
}

// 4. FORM SWAP TOGGLE
function toggleForm() {
    const body = document.body;
    const formText = document.getElementById('form-text');
    const formIcon = document.getElementById('form-icon');
    const currentTheme = body.getAttribute('data-theme');
    
    if (formIcon) {
        formIcon.style.transform = "rotate(360deg)";
        formIcon.style.transition = "transform 0.4s ease";
    }
    
    let newTheme = 'ousia';

    if (currentTheme === 'ousia') {
        newTheme = 'pneuma';
        if (formText) formText.textContent = "Ousia Form";
    } else {
        newTheme = 'ousia';
        if (formText) formText.textContent = "Pneuma Form";
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('furina-theme', newTheme);
    
    if (formIcon) {
        setTimeout(() => {
            formIcon.style.transform = "none";
            formIcon.style.transition = "none";
        }, 400);
    }
}