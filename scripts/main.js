// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Configuración del efecto de escritura para el título principal
    const typed = new Typed(".home__title-text", {
        strings: ["Antonio Romero", "Desarrollador Web", "Full Stack Developer"],
        typeSpeed: 100,          // Velocidad de escritura en milisegundos
        backSpeed: 50,           // Velocidad de borrado en milisegundos
        backDelay: 2000,         // Pausa antes de borrar en milisegundos
        loop: true,              // Repetir la animación indefinidamente
    });

    // Configuración inicial de ScrollReveal para las animaciones de entrada
    const sr = ScrollReveal({
        origin: "top",           // Los elementos aparecen desde arriba
        distance: "60px",        // Distancia del desplazamiento
        duration: 500,           // Duración de la animación
        delay: 50,               // Retraso inicial
        reset: false,            // No repetir animaciones al volver a la vista
    });

    // Objeto con todas las configuraciones de animaciones por sección
    const animations = {
        home: {
            title: { duration: 2000, distance: "50px", origin: "left" },      // Animación del título principal
            description: { delay: 600, origin: "right", interval: 100 },      // Animación de la descripción
            social: { delay: 700, distance: "100px", origin: "bottom" }       // Animación de iconos sociales
        },
        about: {
            img: { origin: "left", distance: "120px", duration: 2000 },       // Animación de la imagen de perfil
            data: { origin: "right", distance: "120px", duration: 2000 },     // Animación del texto "sobre mí"
            box: { interval: 200, scale: 0.8, duration: 1800 }                // Animación de las cajas de estadísticas
        },
        common: {
            skills: { interval: 200, scale: 0.8, origin: "bottom", distance: "50px" },    // Animación de habilidades
            projects: { interval: 200, scale: 0.8, origin: "bottom", distance: "100px" }, // Animación de proyectos
            contact: { interval: 200, origin: "left", distance: "100px" }                 // Animación de contacto
        }
    };

    // Aplicación de las animaciones a los elementos correspondientes
    sr.reveal(".home__title", animations.home.title);
    sr.reveal(".home__description", animations.home.description);
    sr.reveal(".home__social", animations.home.social);
    sr.reveal(".about__img", animations.about.img);
    sr.reveal(".about__data", animations.about.data);
    sr.reveal(".about__box", animations.about.box);
    sr.reveal(".skills__content", animations.common.skills);
    sr.reveal(".project__card", animations.common.projects);
    sr.reveal(".contact__card", animations.common.contact);

    // Función para el menú móvil
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show-menu');
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('show-menu');
        });
    });

    // Función para alternar la visibilidad del menú móvil
    function toggleMenu(show = null) {
        navMenu.classList.toggle("show-menu", show);
        const icon = navToggle.querySelector("i").classList;
        icon.toggle("fa-bars", !navMenu.classList.contains("show-menu"));
        icon.toggle("fa-times", navMenu.classList.contains("show-menu"));
    }

    // Eventos para el menú móvil
    navToggle.addEventListener("click", () => toggleMenu());
    document.querySelectorAll(".nav__link").forEach(link => {
        link.addEventListener("click", () => toggleMenu(false));
    });

    // Función para actualizar el enlace activo en la navegación
    const updateActiveLink = () => {
        const scrollY = window.pageYOffset;
        document.querySelectorAll("section[id]").forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 50;
            const sectionId = section.getAttribute("id");
            const link = document.querySelector(`.nav__link[href*=${sectionId}]`);
            link.classList.toggle("active-link",
                scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
        });
    };

    // Eventos globales
    window.addEventListener("scroll", updateActiveLink);
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Configuración del desplazamiento suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(e.target.getAttribute("href"))
                .scrollIntoView({ behavior: "smooth" });
        });
    });
});