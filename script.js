// ==========================================================
// 1 - MODO CLARO / OSCURO
// ==========================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-bs-theme', savedTheme);
}

function updateThemeButton(theme) {
    if (!themeToggleBtn) return;
    const lang = htmlElement.getAttribute('lang') || 'es';
    const isDark = theme === 'dark';
    const icon = isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill';
    const label = isDark
        ? (lang === 'en' ? 'Light mode' : 'Modo Claro')
        : (lang === 'en' ? 'Dark mode' : 'Modo Oscuro');
    themeToggleBtn.innerHTML = '<i class="bi ' + icon + ' me-1"></i> ' + label;
}

if (themeToggleBtn) {
    updateThemeButton(htmlElement.getAttribute('data-bs-theme') || 'light');
    themeToggleBtn.addEventListener('click', () => {
        const current = htmlElement.getAttribute('data-bs-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
        updateThemeButton(next);
    });
}

// ==========================================================
// 2 - TYPEWRITER BILINGÜE (opción B)
// ==========================================================
const phrasesByLang = {
    es: [
        'Desarrollo Web Frontend',
        'Desarrollo Web Backend',
        'Diseño Web Responsive',
        'Programación de básico a avanzado',
        'Proyectos a gran escala',
        'Aprendizaje y educación digital',
        'Optimización SEO para Google'
    ],
    en: [
        'Frontend Web Development',
        'Backend Web Development',
        'Responsive Web Design',
        'Programming from beginner to advanced',
        'Large-scale projects',
        'Learning and digital education',
        'SEO optimization for Google'
    ]
};

const typewriterElement = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimer = null;

function getPhrases() {
    const lang = htmlElement.getAttribute('lang') || 'es';
    return phrasesByLang[lang] || phrasesByLang.es;
}

function resetTypewriter() {
    if (typeTimer) clearTimeout(typeTimer);
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    if (typewriterElement) typewriterElement.textContent = '';
}

function typeEffect() {
    if (!typewriterElement) return;
    const list = getPhrases();
    if (!list.length) return;
    if (phraseIndex >= list.length) phraseIndex = 0;

    const currentPhrase = list[phraseIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % list.length;
        typingSpeed = 400;
    }

    typeTimer = setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typewriterElement) typeTimer = setTimeout(typeEffect, 500);
});

// ==========================================================
// 3 - TRADUCCIÓN ES / EN
// ==========================================================
const langToggleBtn = document.getElementById('lang-toggle');
const langTextSpan = document.getElementById('lang-text');

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const currentLang = htmlElement.getAttribute('lang') || 'es';
        const newLang = currentLang === 'es' ? 'en' : 'es';

        htmlElement.setAttribute('lang', newLang);
        if (langTextSpan) langTextSpan.textContent = newLang === 'es' ? 'EN' : 'ES';

        document.querySelectorAll('[data-es][data-en]').forEach((el) => {
            el.textContent = el.getAttribute('data-' + newLang);
        });

        updateThemeButton(htmlElement.getAttribute('data-bs-theme') || 'light');
        resetTypewriter();
        typeTimer = setTimeout(typeEffect, 200);
    });
}
