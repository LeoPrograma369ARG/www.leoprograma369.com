// ==========================================
// 1. MODO OSCURO / CLARO
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // Etiqueta <html>

// Verificar si hay un tema guardado en localStorage al cargar la página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateButtonText(savedTheme);
}

// Evento de clic en el botón
themeToggleBtn.addEventListener('click', () => {
    // Leer el tema actual
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    // Alternar el tema
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Aplicar nuevo tema y guardarlo en el navegador
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Actualizar texto del botón
    updateButtonText(newTheme);
});

// Función para cambiar el texto del botón
function updateButtonText(theme) {
    themeToggleBtn.innerHTML = theme === 'light' ? '🌓 Modo Oscuro' : '☀️ Modo Claro';
}

// ==========================================
// 2. EFECTO TYPEWRITER (Máquina de escribir)
// ==========================================
const words = ["Desarrollador Web", "Ingeniero de Software", "Diseñador UI/UX"];
const typewriterElement = document.getElementById('typewriter');

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    // Determinar qué parte de la palabra mostrar
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Velocidades de escritura/borrado
    let typingSpeed = isDeleting ? 50 : 100;

    // Lógica para cambiar de palabra al terminar de escribir o borrar
    if (!isDeleting && charIndex === currentWord.length) {
        // Pausa al terminar de escribir la palabra entera
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Pasar a la siguiente palabra
        typingSpeed = 500; // Pausa antes de empezar nueva palabra
    }

    // Llamada recursiva con setTimeout
    setTimeout(typeEffect, typingSpeed);
}

// Iniciar el efecto cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 500); // Pequeño retraso al cargar
});
