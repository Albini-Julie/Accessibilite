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


