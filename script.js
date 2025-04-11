const localisation__button = document.getElementById('localisation__button');
const localisation__aide = document.getElementById('localisation__aide');

// Afficher le canvas lorsque le bouton "Valider" est cliqué
function toggleDisplay(buttonId, contentId) {
    const button = document.getElementById(buttonId);
    const content = document.getElementById(contentId);

    button.addEventListener('click', (event) => {
        event.preventDefault(); 
        // Vérifie si l'élément est visible et alterne l'affichage
        if (content.style.display === 'block'){
            content.style.display = 'none'; 
        }
        else{
            content.style.display = 'block'; 
        }
    });
}

toggleDisplay('localisation__button', 'localisation__aide');
toggleDisplay('localisation__button2', 'localisation__aide2');
toggleDisplay('video__button1', 'video__aide1');
toggleDisplay('video__button2', 'video__aide2');

// Carrousel
document.querySelectorAll('.working__carrousel').forEach((carousel) => {
    const images = Array.from(carousel.querySelectorAll('.carrousel__image'));
    const pagination = carousel.querySelector('.caroussel__pagination');
    const autoplayButton = carousel.querySelector('.carrousel__pause');
    const prevButton = carousel.querySelector('.--prev');
    const nextButton = carousel.querySelector('.--next');

    let currentIndex = 0;
    let autoplayInterval = null;
    let isAutoplaying = true;
    const autoplayDelay = 4000;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
            img.setAttribute("aria-label", `${i + 1} sur ${images.length}`);
        });

        updateDots(index);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    function updateDots(index) {
        const dots = pagination.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            const isActive = i === index;
            dot.classList.toggle('active', isActive);
            dot.setAttribute("aria-selected", isActive ? "true" : "false");
            dot.setAttribute("tabindex", isActive ? "0" : "-1");
        });
    }

    function createDots() {
        pagination.innerHTML = '';
        pagination.setAttribute("role", "tablist");

        images.forEach((img, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute("role", "tab");
            dot.setAttribute("aria-label", `Aller à la diapositive ${i + 1}`);
            dot.setAttribute("aria-controls", img.id);
            dot.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
            dot.setAttribute("tabindex", i === currentIndex ? "0" : "-1");

            if (i === currentIndex) dot.classList.add("active");

            dot.addEventListener('click', () => {
                currentIndex = i;
                showImage(currentIndex);
            });

            pagination.appendChild(dot);
        });
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextImage, autoplayDelay);
        carousel.setAttribute("aria-live", "off");

        autoplayButton.textContent = "Mettre le carrousel en pause";
        autoplayButton.setAttribute("aria-label", "Mettre le carrousel en pause");
        autoplayButton.setAttribute("aria-pressed", "true");

        isAutoplaying = true;
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
        carousel.setAttribute("aria-live", "polite");

        autoplayButton.textContent = "Reprendre la lecture du carrousel";
        autoplayButton.setAttribute("aria-label", "Reprendre la lecture du carrousel");
        autoplayButton.setAttribute("aria-pressed", "false");

        isAutoplaying = false;
    }

    autoplayButton.addEventListener('click', () => {
        isAutoplaying ? stopAutoplay() : startAutoplay();
    });

    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    // Init
    createDots();
    showImage(currentIndex);
    startAutoplay();
});


// Formulaire 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+33\s[67]\s\d{8}$/; // Format : +33 6 00000000

    function validateField(field) {
        const errorMessage = field.parentElement.querySelector(".error-message"); // Assure qu'on sélectionne le bon message d'erreur
        let isValid = true;

        // Réinitialisation
        errorMessage.textContent = "";
        field.style.border = "1px solid #ccc";

        if (field.hasAttribute("required") && field.value.trim() === "") {
            errorMessage.textContent = "Ce champ est obligatoire.";
            field.style.border = "2px solid red";
            isValid = false;
        } else if (field.id === "email" && !emailPattern.test(field.value.trim())) {
            errorMessage.textContent = "Veuillez entrer une adresse email valide (ex: exemple@mail.com).";
            field.style.border = "2px solid red";
            isValid = false;
        } else if (field.id === "tel" && field.value.trim() !== "" && !phonePattern.test(field.value.trim())) {
            errorMessage.textContent = "Le format du numéro doit être : +33 6 00000000.";
            field.style.border = "2px solid red";
            isValid = false;
        }

        return isValid;
    }

    form.addEventListener("submit", function (event) {
        let isValid = true;
        const fields = form.querySelectorAll(".formulaire__input");

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault(); // Empêche l'envoi du formulaire en cas d'erreurs
        }
    });

    // Vérification en temps réel
    const fields = form.querySelectorAll(".formulaire__input");
    fields.forEach(field => {
        field.addEventListener("input", () => validateField(field));
    });
});


// Variables pour les éléments du menu
const headerButton = document.getElementById('header-button');
const headerCroix = document.getElementById('header-croix');
const headerContent = document.getElementById('header-content');
const menuLinks = document.querySelectorAll('.header__navigation.--mobile a');

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    // Vérifie si le menu est actuellement affiché
    const isMenuOpen = headerContent.style.display === 'block';
    
    if (isMenuOpen) {
        // Ferme le menu
        headerContent.style.display = 'none';
        document.body.style.overflow = ''; // Restaure le défilement du corps
        headerButton.setAttribute('aria-expanded', 'false');
        headerContent.setAttribute('aria-hidden', 'true');
        headerButton.focus(); // Focus sur le bouton hamburger
        trapFocus(false); // Retire le piège de focus
    } else {
        // Ouvre le menu
        headerContent.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Désactive le défilement du corps
        headerButton.setAttribute('aria-expanded', 'true');
        headerContent.setAttribute('aria-hidden', 'false');
        headerContent.querySelector('a').focus(); // Focus sur le premier élément du menu
        trapFocus(true); // Bloque le focus à l'intérieur du menu
    }
}

// Fonction pour fermer le menu lorsqu'un lien est cliqué
function closeMenu() {
    headerContent.style.display = 'none'; 
    document.body.style.overflow = '';
    headerButton.setAttribute('aria-expanded', 'false');
    headerContent.setAttribute('aria-hidden', 'true');
    headerButton.focus(); // Focus sur le bouton hamburger après fermeture
    trapFocus(false); // Retire le piège de focus
}

// Fonction pour empêcher le focus de sortir du menu et mettre le focus sur la croix
function trapFocus(shouldTrap) {
    const headerContent = document.getElementById('header-content');
    const focusableElements = headerContent.querySelectorAll('a, button');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const closeButton = document.getElementById('header-croix'); // Bouton de fermeture

    if (shouldTrap) {
        // Mettre le focus sur la croix dès que le piège est activé
        closeButton.focus(); 

        headerContent.addEventListener('keydown', function(e) {
            const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
            if (!isTabPressed) return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { 
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    } else {
        // Retirer l'écoute du focus lorsqu'on désactive le piège
        headerContent.removeEventListener('keydown', trapFocus);
    }
}

// Écouteurs d'événements pour ouvrir et fermer le menu
headerButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu();
});

headerCroix.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu();
});

// Ajout d'écouteurs pour chaque lien du menu pour fermer le menu quand un lien est cliqué
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});




// Message de réussite de l'envoie du formulaire
const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Empêche l'envoi réel

        const requiredFields = form.querySelectorAll('[required]');
        let formValid = true;

        requiredFields.forEach(field => {
            const errorId = field.getAttribute('aria-describedby');
            const errorElem = errorId ? document.getElementById(errorId) : null;

            if (!field.value.trim()) {
                formValid = false;
                if (errorElem) errorElem.textContent = "Ce champ est obligatoire.";
            } else {
                if (errorElem) errorElem.textContent = "";
            }
        });

        if (formValid) {
            alert("✅ Votre message a bien été envoyé !");
            form.reset();
        }
    });