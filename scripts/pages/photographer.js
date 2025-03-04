/*global getPhotographerById */
/*global getMediaPhotographer */
/*global getLikesPhotographer */
/*global  namePhotographerModal*/

async function main() {
  const params = new URLSearchParams(window.location.search);
  const idFromUrl = parseInt(params.get("id")); // Convertir en nombre

  let photographer = await getPhotographerById(idFromUrl);
  let media = await getMediaPhotographer(idFromUrl);

  // Récupérer le total des likes
  const totalLikes = await getLikesPhotographer(idFromUrl);

  displayPhotographerInfo(photographer, totalLikes);
  displayMedia(media, totalLikes); // Passer totalLikes à displayMedia

  displayDropdown();

  let sortedMedia = sortMediaByPopularity(media);
  displayMedia(sortedMedia);

  handleSorting(media);

  const nameToDisplay = photographer.name;
  namePhotographerModal(nameToDisplay);
}
let currentMedia = []; // Stocke les médias du photographe
let currentIndex = 0; // Stocke l’index du média affiché dans la modale

function displayPhotographerInfo(photographer, totalLikes) {
  document.getElementById("name-container").innerHTML = photographer.name;
  document.getElementById(
    "infos-container"
  ).innerHTML = `${photographer.city}, ${photographer.country}`;
  document.getElementById(
    "photographer-portrait"
  ).src = `./photos/samplephotos/photographersidphotos/${photographer.portrait}`;
  document.getElementById("tagline-container").innerHTML = photographer.tagline;

  // ajout des class css
  const nameContainer = document.getElementById("name-container");
  nameContainer.innerHTML = photographer.name;
  nameContainer.classList.add("photographer-name");

  const infosContainer = document.getElementById("infos-container");
  infosContainer.innerHTML = `${photographer.city}, ${photographer.country}`;
  infosContainer.classList.add("photographer-location");

  const photographerPortrait = document.getElementById("photographer-portrait");
  photographerPortrait.src = `./photos/samplephotos/photographersidphotos/${photographer.portrait}`;
  photographerPortrait.classList.add("photographer-portrait-image");

  const taglineContainer = document.getElementById("tagline-container");
  taglineContainer.innerHTML = photographer.tagline;
  taglineContainer.classList.add("photographer-tagline");

  //Ajout de la banniere like et prix journalier

  const likesElement = document.querySelector(".totalikes");
  likesElement.textContent = totalLikes;

  const priceElement = document.querySelector(".tarifjournalier");
  priceElement.textContent = `${photographer.price} €/jour`;
}

function displayMedia(media) {
  currentMedia = media; // Met à jour le tableau global avec les médias du photographe

  const mediaContainer = document.getElementById("media-container");
  mediaContainer.innerHTML = "";

  // Boucler sur chaque media
  media.forEach((mediaItem, index) => {
    // Créer un élément pour chaque media
    const mediaElement = document.createElement("article");

    if (mediaItem.image) {
      // Ajouter une image
      const imageElement = document.createElement("img");

      
      imageElement.tabIndex = 0;
      const photographerFolder = mediaItem.photographerId;

      imageElement.src =
        "./photos/imagesetvideos/" + photographerFolder + "/" + mediaItem.image;
      mediaElement.appendChild(imageElement);

      // ouvre la modale en cliquant sur l'ímage

      imageElement.addEventListener("click", () => {
        openModal(index);
      });

      // Ouvre la modale en appuyant sur "Entrée"

      imageElement.addEventListener("keydown", (event) => {
        
        if (event.key === "Enter") {
        
          openModal(index);
        }
      });

      mediaElement.appendChild(imageElement);

      mediaContainer.appendChild(mediaElement);
    } else if (mediaItem.video) {
      // Ajouter une vidéo
      const videoElement = document.createElement("video");
      const photographerFolder = mediaItem.photographerId;

      videoElement.src =
        "./photos/imagesetvideos/" + photographerFolder + "/" + mediaItem.video;


      videoElement.tabIndex = 0;

      // ouverture de la modale au click et Entree
      videoElement.addEventListener("click", () => {
        openModal(index);
      });

      videoElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          openModal(index);
        }
      });

      mediaElement.appendChild(videoElement);
    }

    // Créer une div pour le titre et les likes
    const divLikeContainer = document.createElement("div");
    divLikeContainer.classList.add("container-likes");

    // Ajouter un paragraphe pour le titre
    const titleParagraph = document.createElement("p");
    titleParagraph.textContent = mediaItem.title;
    divLikeContainer.appendChild(titleParagraph); 

    // Ajouter un paragraphe pour les likes
    const likesParagraph = document.createElement("p");
    likesParagraph.textContent = mediaItem.likes;
    divLikeContainer.appendChild(likesParagraph); 

    //Ajout des coeurs

    const heartLikes = document.createElement("button");
    heartLikes.classList.add("fa-solid", "fa-heart", "heart-icon");
    divLikeContainer.appendChild(heartLikes);

    // Ajouter un gestionnaire d'événements pour augmenter les likes

    mediaItem.isLiked = false;

    heartLikes.addEventListener("click", () => {
      let totalLikes = parseInt(
        document.querySelector(".totalikes").textContent,
        10
      );
      if (mediaItem.isLiked === false) {
        mediaItem.likes++;
        mediaItem.isLiked = true;
        totalLikes++;
      } else if (mediaItem.isLiked === true) {
        mediaItem.likes--;
        mediaItem.isLiked = false;
        totalLikes--;
      }

      likesParagraph.textContent = mediaItem.likes;
      document.querySelector(".totalikes").textContent = totalLikes;
    });

    //div regroupant likes et coeur

    const likesStyle = document.createElement("div");
    likesStyle.appendChild(likesParagraph);
    likesStyle.appendChild(heartLikes);
    likesStyle.classList.add("stylediv");

    // Ajouter la div des likes au conteneur principal
    divLikeContainer.appendChild(likesStyle);

    // Ajouter la div au mediaElement
    mediaElement.appendChild(divLikeContainer);

    // Ajouter l'élément média au conteneur principal
    mediaContainer.appendChild(mediaElement);
  });
}

function displayDropdown() {
  const dropdownContainer = document.querySelector("#dropdown-container");

  const options = ["Popularité", "Date", "Titre"];

  // Bouton principal du dropdown
  const dropdownButton = document.createElement("div");
  dropdownButton.classList.add("title-dropdown");
  dropdownButton.tabIndex = 0; 

  dropdownButton.setAttribute("aria-haspopup", "listbox");
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.setAttribute("aria-labelledby", "dropdown-label");

  // Création du texte affiché sur le bouton
  const titledropdown = document.createElement("span");
  titledropdown.textContent = options[0]; // Par défaut "Popularité"
  titledropdown.classList.add("dropdown-title");
  titledropdown.style.borderBottom = "none"; // Supprime la bordure sous Popularité
  titledropdown.id = "dropdown-label"; // ID pour aria-labelledby
  dropdownButton.appendChild(titledropdown);

  // Icône de flèche
  const fleche = document.createElement("button");
  fleche.classList.add("fa-solid", "fa-angle-up");

  dropdownButton.appendChild(fleche);
  dropdownContainer.appendChild(dropdownButton);

  // Création de la liste des options du menu
  const dropdownOptions = document.createElement("div");
  dropdownOptions.classList.add("dropdown-options", "close");
  dropdownOptions.setAttribute("role", "listbox");
  dropdownOptions.setAttribute("aria-labelledby", "dropdown-label");

  options.slice(1).forEach((optionText) => {
    const option = document.createElement("button");
    option.textContent = optionText;
    option.classList.add("option-title");
    option.setAttribute("role", "option");
    option.tabIndex = 0;

    // Ajout d'un événement de clic sur chaque option
    option.addEventListener("click", () => {
      // Échange des valeurs permet d echanger entre les options de position
      let currentText = titledropdown.textContent;
      titledropdown.textContent = option.textContent;
      option.textContent = currentText;

      closeDropdown();
    });

    dropdownOptions.appendChild(option);
  });

  dropdownContainer.appendChild(dropdownOptions);

  // Gestion de l'ouverture et fermeture du menu
  fleche.addEventListener("click", toggleDropdown);

  function toggleDropdown() {
    if (fleche.classList.contains("fa-angle-up")) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  function openDropdown() {
    dropdownButton.setAttribute("aria-expanded", "true");

    fleche.classList.replace("fa-angle-up", "fa-chevron-down"); //Remplace la flèche vers le haut par une flèche vers le bas
    dropdownOptions.classList.replace("close", "open"); //Ouvre le menu (close devient open)
    dropdownButton.style.borderBottom = "1px solid white";

    const optionsList = dropdownOptions.querySelectorAll(".option-title");
    optionsList[0].tabIndex = 0; // Active le focus sur la première option
    optionsList[0].focus();
  }

  function closeDropdown() {
    dropdownButton.setAttribute("aria-expanded", "false");
    fleche.classList.replace("fa-chevron-down", "fa-angle-up"); //Remet la flèche vers le haut
    dropdownOptions.classList.replace("open", "close"); //Ferme le menu (open devient close).
    dropdownButton.style.borderBottom = "none";
    dropdownButton.focus();
  }
}

// permet de trier une liste d’objets media en fonction de l'option sélectionnée.

function handleSorting(media) {
  document.querySelectorAll(".option-title").forEach((option) => {
    option.addEventListener("click", () => {
      const dropdownTitle = document.querySelector(".dropdown-title");
      let selectedOption = dropdownTitle.textContent;
      let sortedMedia; // Déclaration de la variable

      if (selectedOption === "Popularité") {
        sortedMedia = sortMediaByPopularity(media);
      } else if (selectedOption === "Date") {
        sortedMedia = sortMediaByDate(media);
      } else if (selectedOption === "Titre") {
        sortedMedia = sortMediaByTitle(media);
      } else {
        sortedMedia = media;
      }

      displayMedia(sortedMedia);
    });
  });
}

// trie en fonction des dates nbr de likes et ordre alphabetique

function sortMediaByPopularity(media) {
  return [...media].sort((a, b) => b.likes - a.likes);
}

function sortMediaByDate(media) {
  return [...media].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortMediaByTitle(media) {
  return [...media].sort((a, b) => a.title.localeCompare(b.title));
}

// Elements liés a la modal d'ímages

const modal = document.getElementById("media-modal");

const modalTitle = document.getElementById("modal-title");
const closeModalBtn = document.querySelector(".close-modal");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

function createImageElement() {
  const modalMedia = document.getElementById("modal-media");
  modalMedia.innerHTML = "";

  const modalImage = document.createElement("img");
  modalImage.id = "modal-image";
  modalImage.alt = "Apercu de l'ímage";

  modalMedia.appendChild(modalImage);
}

function createVideoElement() {
  const modalMedia = document.getElementById("modal-media");
  modalMedia.innerHTML = "";

  const modalVideo = document.createElement("video");
  modalVideo.id = "modal-video";
  modalVideo.alt = "Apercu de la video";
  modalVideo.controls = true;

  modalMedia.appendChild(modalVideo);
}

// ouverture de la modale a image

function openModal(index) {
  currentIndex = index; // Met à jour l’index de l’image actuelle
  modal.classList.add("modal-overlay");
  modal.style.display = "flex"; 

  updateModal(); // Charge l'image ou la vidéo AVANT d'ajouter les attributs

  // Récupère les éléments après l'affichage
  const modalImage = document.getElementById("modal-image");
  const modalVideo = document.getElementById("modal-video");

  // Vérifie si les éléments existent avant d'appliquer setAttribute
  if (modalImage) {
    modalImage.setAttribute("tabindex", "0");
    modalImage.focus(); 
  }

  if (modalVideo) {
    modalVideo.setAttribute("tabindex", "0");
    modalVideo.focus(); 
  }

  closeModalBtn.setAttribute("tabindex", "0");

  // accessibilité clavier avec fleches

  leftArrow.setAttribute("tabindex", "0"); 
  rightArrow.setAttribute("tabindex", "0"); 
}

function displayPreviousMedia() {
  currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
  updateModal();
}

function displayNextMedia() {
  currentIndex = (currentIndex + 1) % currentMedia.length;
  updateModal();
}

leftArrow.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    displayPreviousMedia();
    leftArrow.focus();
  }
});

leftArrow.addEventListener("click", () => {
  displayPreviousMedia();
});

rightArrow.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    displayNextMedia();
    rightArrow.focus();
  }
});

rightArrow.addEventListener("click", () => {
  displayNextMedia();
});

modal.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    displayPreviousMedia();
    leftArrow.focus();
  } else if (event.key === "ArrowRight") {
    displayNextMedia();
    rightArrow.focus();
  }
});

function closeMediaModal() {
  modal.style.display = "none";
}
closeModalBtn.addEventListener("click", closeMediaModal);
closeModalBtn.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeMediaModal();
  }
});

function getNextMediaTitle() {
  let nextIndex = (currentIndex + 1) % currentMedia.length;
  return currentMedia[nextIndex].title;
}

function getPreviousMediaTitle() {
  let previousIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
  return currentMedia[previousIndex].title;
}


function loadImageInModal(imageSrc, titleParagraph) {
  createImageElement();
   getNextMediaTitle() 
   getPreviousMediaTitle()
  const modalImage = document.getElementById("modal-image");
  modalImage.src = imageSrc; // Change la source de l'image
  modalTitle.textContent = titleParagraph; // Ajoute le titre sous l'image
  modalTitle.className = titleParagraph.className;
  modalTitle.setAttribute("tabindex", "-1");
  //modalTitle.focus();
  
  modalImage.setAttribute("tabindex", "0");
}

function loadVideoModal(videoSrc, titleParagraph) {
  createVideoElement();
  getNextMediaTitle() 
  getPreviousMediaTitle()
  const modalVideo = document.getElementById("modal-video");
  modalVideo.src = videoSrc;
  modalTitle.textContent = titleParagraph;
  modalTitle.className = titleParagraph.className;
}

//met à jour l’image et le titre affichés dans la modale

function updateModal() {
  const mediaItem = currentMedia[currentIndex];
  const imageSrc = `./photos/imagesetvideos/${mediaItem.photographerId}/${mediaItem.image}`;
  const videoSrc = `./photos/imagesetvideos/${mediaItem.photographerId}/${mediaItem.video}`;

  if (mediaItem.image) {
    loadImageInModal(imageSrc, mediaItem.title);
    
  }

  if (mediaItem.video) {
    loadVideoModal(videoSrc, mediaItem.title);
  }
}

main();
