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