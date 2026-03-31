// Documento JavaScript

/*

TemplateMo 600 Prism Flux

https://templatemo.com/tm-600-prism-flux

*/


// Datos del portafolio para el carrusel

const portfolioData = [
    {
        id: 1,
        title: 'Plataforma web para promoción y venta',
        description: 'Plataforma integral para gestión de inventario, facturación y reportes de ventas.',
        image: 'imagenes/neural-network.jpg',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap', 'Hostinger']
    },
    {
        id: 2,
        title: 'Sistema de gestión de restaurante ',
        description: 'Aplicación que permite a restaurantes gestionar platillos e ingredientes con calculo automático de costos y precios de venta',
        image: 'imagenes/quantum-cloud.jpg',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'PWA', 'IndexedDB']
    },
    {
        id: 3,
        title: 'Bot Reclutador de WhatsApp',
        description: 'Sistema automatizado diseñado para agilizar y administrar el proceso de reclutamiento de empresas a través de WhatsApp',
        image: 'imagenes/blockchain-vault.jpg',
        tech: ['Node.js', 'WhatsApp Web', 'Google Spreadsheets API', 'Generadores QR', 'Express.js']
    }
];

// Datos de habilidades
const skillsData = [
    { name: 'HTML / HTML5', icon: 'imagenes/logohtml5.ico', category: 'frontend' },
    { name: 'CSS / CSS3', icon: 'imagenes/logocss3.ico', category: 'frontend' },
    { name: 'JavaScript', icon: 'imagenes/logojs.ico', category: 'frontend' },
    { name: 'Bootstrap', icon: 'imagenes/logobootsrap.ico', category: 'frontend' },
    { name: 'PWA', icon: 'imagenes/logpwa.ico', category: 'frontend' },
    { name: 'IndexedDB', icon: 'imagenes/logoindexeddb.ico', category: 'frontend' },
    { name: 'PHP', icon: 'imagenes/logophp.ico', category: 'backend' },
    { name: 'MySQL', icon: 'imagenes/logomysql.ico', category: 'backend' },
    { name: 'Node.js', icon: 'imagenes/logonodejs.ico', category: 'backend' },
    { name: 'Express.js', icon: 'imagenes/logoexpress.ico', category: 'backend' },
    { name: 'Hostinger', icon: 'imagenes/logohostinger.ico', category: 'nube' },
    { name: 'WhatsApp Web', icon: 'imagenes/logowhatsapp.ico', category: 'herramientas' },
    { name: 'Google Sheets API', icon: 'imagenes/logosheets.ico', category: 'herramientas' },
    { name: 'Generadores QR', icon: 'imagenes/logoqr.ico', category: 'herramientas' }
];

// Función para desplazarse a una sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Inicializar partículas para la sección de filosofía
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Posición horizontal aleatoria
        particle.style.left = Math.random() * 100 + '%';

        // Iniciar partículas en posiciones verticales aleatorias a lo largo de la sección
        particle.style.top = Math.random() * 100 + '%';

        // Retardo de animación aleatorio para un movimiento natural
        particle.style.animationDelay = Math.random() * 20 + 's';

        // Duración de animación aleatoria para dar variedad
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Inicializar carrusel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    item.innerHTML = `
                <div class="card">
                    <div class="card-number">0${data.id}</div>
                    <div class="card-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.description}</p>
                    <div class="card-tech">${techBadges}</div>
                    <button class="card-cta" onclick="scrollToSection('about')">Ver más</button>
                </div>
            `;

    return item;
}

function initCarousel() {
    // Crear elementos del carrusel
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        // Crear indicador
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    const isSmallMobile = window.innerWidth <= 480;

    items.forEach((item, index) => {
        // Calcular posición relativa
        let offset = index - currentIndex;

        // Envolver para rotación continua
        if (offset > totalItems / 2) {
            offset -= totalItems;
        } else if (offset < -totalItems / 2) {
            offset += totalItems;
        }

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        // Restablecer transformación
        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

        // Ajustar espaciado según el tamaño de la pantalla
        let spacing1 = 400;
        let spacing2 = 600;
        let spacing3 = 750;

        if (isSmallMobile) {
            spacing1 = 220;
            spacing2 = 330;
            spacing3 = 430;
        } else if (isMobile) {
            spacing1 = 280;  // Was 400, now 100px closer
            spacing2 = 420;  // Was 600, now 180px closer
            spacing3 = 550;  // Was 750, now 200px closer
        } else if (isTablet) {
            spacing1 = 340;
            spacing2 = 520;
            spacing3 = 650;
        }

        if (absOffset === 0) {
            // Elemento central
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            // Elementos laterales
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            // Elementos laterales más alejados
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            // Elementos aún más alejados
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            // Elementos ocultos (detrás)
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Inicializar cuadrícula hexagonal de habilidades
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryTabs = document.querySelectorAll('.category-tab');

    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';

        const filteredSkills = category === 'all'
            ? skillsData
            : skillsData.filter(skill => skill.category === category);

        filteredSkills.forEach((skill, index) => {
            const hexagon = document.createElement('div');
            hexagon.className = 'skill-hexagon';
            hexagon.style.animationDelay = `${index * 0.1}s`;

            hexagon.innerHTML = `
                        <div class="hexagon-inner">
                            <div class="hexagon-content">
                                <div class="skill-icon-hex"><img src="${skill.icon}" alt="${skill.name}"></div>
                                <div class="skill-name-hex">${skill.name}</div>
                            </div>
                        </div>
                    `;

            skillsGrid.appendChild(hexagon);
        });
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });

    displaySkills();
}

// Escuchadores de eventos
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Rotación automática del carrusel
setInterval(nextSlide, 5000);

// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Actualizar carrusel al cambiar el tamaño de la ventana
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Inicializar al cargar
initCarousel();
initSkillsGrid();
initParticles();

// Alternar menú móvil
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Efecto de desplazamiento del encabezado
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Desplazamiento suave y navegación activa
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Cerrar menú móvil si está abierto
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Actualizar navegación activa al desplazarse
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Contador animado para estadísticas
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer para animación de estadísticas
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                if (!number.classList.contains('animated')) {
                    number.classList.add('animated');
                    animateCounter(number);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Envío del formulario
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    try {
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // IMPORTANTE: Reemplaza "TU_ID_DE_FORMSPREE" con el ID real de tu formulario (ej. mxyzabcd)
        const formspreeUrl = 'https://formspree.io/f/mqegbvln';

        const response = await fetch(formspreeUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Mostrar mensaje de éxito
            alert(`¡Gracias ${data.name}! Tu mensaje ha sido enviado exitosamente. Me pondré en contacto contigo pronto.`);
            // Restablecer formulario
            contactForm.reset();
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                alert(result.errors.map(error => error.message).join(", "));
            } else {
                alert('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
            }
        }
    } catch (error) {
        alert('Hubo un error de conexión. Por favor, revisa tu internet e intenta de nuevo.');
        console.error('Error:', error);
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Pantalla de carga
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);
});

// Agregar efecto parallax a la sección hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});