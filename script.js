// ==========================================================
// TYPEWRITER BILINGÜE (opción B)
// ==========================================================
const phrasesByLang = {
    es: [
        "Desarrollo Web Frontend",
        "Desarrollo Web Backend",
        "Diseño Web Responsive",
        "Programación de básico a avanzado",
        "Proyectos a gran escala",
        "Aprendizaje y educación digital",
        "Optimización SEO para Google"
    ],
    en: [
        "Frontend Web Development",
        "Backend Web Development",
        "Responsive Web Design",
        "Programming from beginner to advanced",
        "Large-scale projects",
        "Learning and digital education",
        "SEO optimization for Google"
    ]
};

const typewriterElement = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function getPhrases() {
    const lang = document.documentElement.getAttribute('lang') || 'es';
    return phrasesByLang[lang] || phrasesByLang.es;
}

function resetTypewriter() {
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    if (typewriterElement) typewriterElement.textContent = '';
}

function typeEffect() {
    if (!typewriterElement) return;
    const list = getPhrases();
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

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typewriterElement) setTimeout(typeEffect, 500);
});

// ==========================================================
// TRADUCCIÓN ES / EN (opción B) + reinicia typewriter
// ==========================================================
const langToggleBtn = document.getElementById('lang-toggle');
const langTextSpan = document.getElementById('lang-text');

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('lang') || 'es';
        const newLang = currentLang === 'es' ? 'en' : 'es';

        document.documentElement.setAttribute('lang', newLang);
        if (langTextSpan) langTextSpan.textContent = newLang === 'es' ? 'EN' : 'ES';

        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${newLang}`);
        });

        resetTypewriter();
    });
}
