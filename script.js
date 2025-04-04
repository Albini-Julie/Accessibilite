const localisation__button = document.getElementById('localisation__button');
const localisation__aide = document.getElementById('localisation__aide');

// Afficher le canvas lorsque le bouton "Valider" est cliqué
localisation__button.addEventListener('click', (event) => {
    event.preventDefault(); 
    if (localisation__aide.style.display === 'block'){
        localisation__aide.style.display = 'none'; 
    }
    else{
        localisation__aide.style.display = 'block'; 
    }
});

const localisation__button2 = document.getElementById('localisation__button2');
const localisation__aide2 = document.getElementById('localisation__aide2');

// Afficher le canvas lorsque le bouton "Valider" est cliqué
localisation__button2.addEventListener('click', (event) => {
    event.preventDefault(); 
    if (localisation__aide2.style.display === 'block'){
        localisation__aide2.style.display = 'none'; 
    }
    else{
        localisation__aide2.style.display = 'block'; 
    }
});

// Carrousel
const images = [
  "img/carrousel_working/img1.jpg",
  "img/carrousel_working/img2.jpg",
  "img/carrousel_working/img3.jpg"
];

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const pagination = document.getElementById("pagination");
const carouselWrapper = document.querySelector(".working__carrousel");

function showImage(index) {
  // Met à jour l'image principale
  const allImages = document.querySelectorAll(".carrousel__image");

  // Cache toutes les images
  allImages.forEach(img => img.style.display = "none");

  // Affiche l'image active
  allImages[index].style.display = "block";

  // Met à jour l'aria-label pour chaque image
  allImages.forEach((img, idx) => {
    img.setAttribute("aria-label", `${idx + 1} sur ${images.length}`);
  });

  // Met à jour la pagination des points
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
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    const isActive = idx === index;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-selected", isActive ? "true" : "false");
    dot.setAttribute("tabindex", isActive ? "0" : "-1");
  });
}

function createDots() {
  pagination.setAttribute("role", "tablist");

  images.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Aller à la diapositive ${idx + 1}`);
    dot.setAttribute("aria-selected", idx === currentIndex ? "true" : "false");
    dot.setAttribute("tabindex", idx === currentIndex ? "0" : "-1");

    // Associer le bouton de pagination à la diapositive via aria-controls
    dot.setAttribute("aria-controls", `img${idx + 1}`);  // L'ID de la diapositive

    if (idx === currentIndex) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentIndex = idx;
      showImage(currentIndex);
    });

    pagination.appendChild(dot);
  });
}

let autoplayInterval = null;
let isAutoplaying = true;
const autoplayDelay = 4000; // 4 secondes

const autoplayButton = document.getElementById("toggleAutoplay");

// Fonction qui lance l'autoplay
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    nextImage();
  }, autoplayDelay);

  // Accessibilité : aria-live désactivé pendant l'autoplay
  carouselWrapper.setAttribute("aria-live", "off");

  autoplayButton.textContent = "Mettre en pause le carrousel";
  autoplayButton.setAttribute("aria-label", "Mettre en pause le carrousel");
  autoplayButton.setAttribute("aria-pressed", "true");
  isAutoplaying = true;
}

// Fonction qui stoppe l'autoplay
function stopAutoplay() {
  clearInterval(autoplayInterval);

  // Accessibilité : aria-live réactivé pendant la navigation manuelle
  carouselWrapper.setAttribute("aria-live", "polite");

  autoplayButton.textContent = "Reprendre la lecture du carrousel";
  autoplayButton.setAttribute("aria-label", "Reprendre la lecture du carrousel");
  autoplayButton.setAttribute("aria-pressed", "false");
  isAutoplaying = false;
}

// Toggle bouton
autoplayButton.addEventListener("click", () => {
  if (isAutoplaying) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

createDots();
showImage(currentIndex);
startAutoplay(); // <= nouvelle ligne