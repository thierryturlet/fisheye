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
  displayMedia(media);

  displayDropdown();

  let sortedMedia = sortMediaByPopularity(media);
  displayMedia(sortedMedia);

  handleSorting(media);

  const nameToDisplay = photographer.name;
  namePhotographerModal(nameToDisplay);
  currentMedia = media;
}

let currentMedia = []; // Stocke les médias du photographe
let currentIndex = 0; // Stocke l’index du média affiché dans la modale

function displayPhotographerInfo(photographer, totalLikes) {
  document.getElementById("name-container").innerHTML = photographer.name;
  document.getElementById("infos-container").innerHTML = `${photographer.city}, ${photographer.country}`;
  document.getElementById("photographer-portrait").src = `./photos/samplephotos/photographersidphotos/${photographer.portrait}`;
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

// ========================= FACTORY PATTERN =========================

// Interface Media
class MediaItem {
  constructor(mediaItem) {
      this.mediaItem = mediaItem;
  }

  createLikeContainer() {
      const divLikeContainer = document.createElement("div");
      divLikeContainer.classList.add("container-likes");
      
      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = this.mediaItem.title;
      divLikeContainer.appendChild(titleParagraph);
      
      const likesParagraph = document.createElement("p");
      likesParagraph.textContent = this.mediaItem.likes;
      divLikeContainer.appendChild(likesParagraph);
      
      const heartLikes = createHeartButton();
      divLikeContainer.appendChild(heartLikes);
      
      const likesStyle = createLikesStyle(likesParagraph, heartLikes);
      divLikeContainer.appendChild(likesStyle);
      
      addLikeEventListener(heartLikes, this.mediaItem, likesParagraph);
      
      return divLikeContainer;
  }
}

// Classe concrète pour les images
class ImageMediaItem extends MediaItem {
  createMediaElement(index) {
      const article = document.createElement('article');
      const img = document.createElement('img');
      img.src = `./photos/imagesetvideos/${this.mediaItem.photographerId}/${this.mediaItem.image}`;
      img.alt = this.mediaItem.title;
      img.tabIndex = 0;

      img.addEventListener('click', () => openModal(index));
      img.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              openModal(index);
          }
      });

      const divLikeContainer = this.createLikeContainer();

      article.appendChild(img);
      article.appendChild(divLikeContainer);

      return article;
  }
}

// Classe concrète pour les vidéos
class VideoMediaItem extends MediaItem {
  createMediaElement(index) {
      const article = document.createElement('article');
      const video = document.createElement('video');
      video.src = `./photos/imagesetvideos/${this.mediaItem.photographerId}/${this.mediaItem.video}`;
      video.alt = this.mediaItem.title;
      video.tabIndex = 0;

      video.addEventListener('click', () => openModal(index));
      video.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              openModal(index);
          }
      });

      const divLikeContainer = this.createLikeContainer();

      article.appendChild(video);
      article.appendChild(divLikeContainer);

      return article;
  }
}

// Factory
class MediaFactory {
  create(mediaItem) {
      if (mediaItem.image) {
          return new ImageMediaItem(mediaItem);
      } else if (mediaItem.video) {
          return new VideoMediaItem(mediaItem);
      } else {
          return null;
      }
  }
}

// ========================= FIN FACTORY PATTERN =========================

// Fonction pour afficher les médias
function displayMedia(media) {
    const mediaContainer = document.getElementById("media-container");
    mediaContainer.innerHTML = "";

    const mediaFactory = new MediaFactory();

    media.forEach((mediaItem, index) => {
        const mediaObj = mediaFactory.create(mediaItem);
        const mediaElement = mediaObj.createMediaElement(index);
        mediaContainer.appendChild(mediaElement);
    });
}

function createHeartButton() {
  const heartLikes = document.createElement("button");
  heartLikes.classList.add("fa-solid", "fa-heart", "heart-icon");

  const heartLikesLabel = document.createElement("span");
  heartLikesLabel.classList.add("screen-reader", "screen-reader-focusable");
  heartLikesLabel.textContent = "J'aime";
  heartLikesLabel.setAttribute("tabindex", "-1")
  heartLikes.addEventListener("mouseover", () => {
    heartLikesLabel.focus();
  })
  heartLikes.appendChild(heartLikesLabel);
  return heartLikes;
}

function createLikesStyle(likesParagraph, heartLikes) {
  const likesStyle = document.createElement("div");
  likesStyle.appendChild(likesParagraph);
  likesStyle.appendChild(heartLikes);
  likesStyle.classList.add("stylediv");
  return likesStyle;
}

function addLikeEventListener(heartLikes, mediaItem, likesParagraph) {
  mediaItem.isLiked = false;
  heartLikes.addEventListener("click", () => {
    let totalLikes = parseInt(document.querySelector(".totalikes").textContent, 10);
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
}

function createDropdown() {
  const options = ["Popularité", "Date", "Titre"];

  const dropdownButton = document.createElement("div");
  dropdownButton.classList.add("title-dropdown");

  const titledropdown = document.createElement("span");
  titledropdown.textContent = options[0];
  titledropdown.classList.add("dropdown-title");
  titledropdown.style.borderBottom = "none";

  const fleche = document.createElement("button");
  fleche.classList.add("fa-solid", "fa-angle-up");
  fleche.setAttribute("aria-haspopup", "listbox");
  fleche.setAttribute("aria-expanded", "false");
  fleche.setAttribute("aria-labelledby", "dropdown-label");

  dropdownButton.appendChild(titledropdown);
  dropdownButton.appendChild(fleche);

  const dropdownOptions = document.createElement("div");
  dropdownOptions.classList.add("dropdown-options", "close");
  dropdownOptions.setAttribute("role", "listbox");
  dropdownOptions.setAttribute("aria-labelledby", "dropdown-label");

  const optionElements = options.slice(1).map(optionText => {
    const option = document.createElement("button");
    option.textContent = optionText;
    option.classList.add("option-title");
    option.setAttribute("role", "option");
    option.tabIndex = 0;
    dropdownOptions.appendChild(option);
    return option;
  });

  return { dropdownButton, dropdownOptions, fleche, titledropdown, optionElements };
}

function setupDropdownEvents(elements) {
  const { dropdownButton, titledropdown, fleche, dropdownOptions, optionElements } = elements;

  function toggleDropdown() {
    if (fleche.classList.contains("fa-angle-up")) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  function openDropdown() {
    dropdownButton.setAttribute("aria-expanded", "true");
    fleche.classList.replace("fa-angle-up", "fa-chevron-down");
    dropdownOptions.classList.replace("close", "open");
    dropdownButton.style.borderBottom = "1px solid white";
    optionElements[0].tabIndex = 0;
    optionElements[0].focus();
  }

  function closeDropdown() {
    dropdownButton.setAttribute("aria-expanded", "false");
    fleche.classList.replace("fa-chevron-down", "fa-angle-up");
    dropdownOptions.classList.replace("open", "close");
    dropdownButton.style.borderBottom = "none";
    dropdownButton.focus();
  }

  fleche.addEventListener("click", toggleDropdown);

  optionElements.forEach(option => {
    option.addEventListener("click", () => {
      let currentText = titledropdown.textContent;
      titledropdown.textContent = option.textContent;
      option.textContent = currentText;
      closeDropdown();
    });
  });

  return { openDropdown, closeDropdown };
}

function displayDropdown() {
  const dropdownElements = createDropdown();
  const dropdownContainer = document.querySelector("#dropdown-container");
  
  dropdownContainer.appendChild(dropdownElements.dropdownButton);
  dropdownContainer.appendChild(dropdownElements.dropdownOptions);

  setupDropdownEvents(dropdownElements);
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
  modalImage.alt = "title";

  modalMedia.appendChild(modalImage);
}

function createVideoElement() {
  const modalMedia = document.getElementById("modal-media");
  modalMedia.innerHTML = "";

  const modalVideo = document.createElement("video");
  modalVideo.id = "modal-video";
  modalVideo.alt ="title";
  modalVideo.controls = true;

  modalMedia.appendChild(modalVideo);
}

// ouverture de la modale a image


function openModal(index) {
  currentIndex = index; // Met à jour l’index de l’image actuelle
  modal.classList.add("modal-overlay");
  modal.style.display = "flex";
  modal.setAttribute("aria-modal", "true"); // Rend la modale accessible
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "modal-title");
  updateModal(); // Charge l'image ou la vidéo AVANT d'ajouter les attributs
  // Récupère tous les éléments de la modale après l'affichage
  const modalImage = document.getElementById("modal-image");
  const modalVideo = document.getElementById("modal-video");
  const modalTitle = document.getElementById("modal-title");
  const closeModalBtn = document.querySelector(".close-modal");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  // Sélectionner tous les éléments focusables
  const focusableElements = modal.querySelectorAll(
    "h2, img, video, button, .left-arrow, .right-arrow,.close-modal, [tabindex]:not([tabindex='-1'])"
  );
  
  const firstElement = focusableElements[0]; // Premier élément focusable
  const lastElement = focusableElements[focusableElements.length - 1]; // Dernier élément focusable
  // Vérifie si les éléments existent et applique tabindex + focus
  if (modalImage) modalImage.setAttribute("tabindex", "0");
  if (modalVideo) modalVideo.setAttribute("tabindex", "0");
  if (modalTitle) modalTitle.setAttribute("tabindex", "0");
  closeModalBtn.setAttribute("tabindex", "0");
  leftArrow.setAttribute("tabindex", "0");
  rightArrow.setAttribute("tabindex", "0");
  // Place le focus sur le premier élément (image/vidéo ou titre si absent)
  if (modalImage) {
    modalImage.focus();
  } else if (modalVideo) {
    modalVideo.focus();
  } else {
    modalTitle.focus();
  }
  // Gestion du piège de focus
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Si Shift + Tab et on est sur le premier élément -> Retour au dernier
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Si Tab et on est sur le dernier élément -> Retour au premier
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
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
  let previousIndex =
    (currentIndex - 1 + currentMedia.length) % currentMedia.length;
  return currentMedia[previousIndex].title;
}

function loadImageInModal(imageSrc, titleParagraph) {
  createImageElement();
  getNextMediaTitle();
  getPreviousMediaTitle();
  const modalImage = document.getElementById("modal-image");
  modalImage.src = imageSrc; // Change la source de l'image
  modalImage.alt = titleParagraph;
  modalTitle.textContent = titleParagraph; // Ajoute le titre sous l'image
  modalTitle.className = titleParagraph.className;
  modalTitle.setAttribute("tabindex", "-1");
  //modalTitle.focus();

  modalImage.setAttribute("tabindex", "0");
}

function loadVideoModal(videoSrc, titleParagraph) {
  createVideoElement();
  getNextMediaTitle();
  getPreviousMediaTitle();
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
