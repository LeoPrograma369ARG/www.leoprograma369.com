// ==========================================================
// 3 - LÓGICA MODO CLARO / OSCURO (PERSISTENTE CON LOCALSTORAGE)
// ==========================================================

const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Cargar preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateButtonText(savedTheme);
}

// Evento de Alternancia
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText(newTheme);
});

function updateButtonText(theme) {
    if (theme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill me-1"></i> Modo Claro';
    } else {
        themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars-fill me-1"></i> Modo Oscuro';
    }
}

// ==========================================================
// EFECTO MÁQUINA DE ESCRIBIR (TYPEWRITER NATIVO)
// ==========================================================

// Frases dinámicas para rotar
const phrases = [
    "Desarrollo Web Frontend",
    "Automatización y DevOps",
    "Creación de Contenido",
    "Tecnología sin Barreras"
];

const typewriterElement = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pausa al terminar de escribir
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Iniciar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (typewriterElement) {
        setTimeout(typeEffect, 500);
    }
});

// LÓGICA DE TRADUCCIÓN LIMPIA (ESPAÑOL / INGLÉS)
const langToggleBtn = document.getElementById('lang-toggle');
const langTextSpan = document.getElementById('lang-text');

if(langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('lang') || 'es';
        const newLang = currentLang === 'es' ? 'en' : 'es';
        
        document.documentElement.setAttribute('lang', newLang);
        langTextSpan.textContent = newLang === 'es' ? 'EN' : 'ES';

        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${newLang}`);
        });
    });
}
