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

function createMediaElement(mediaItem, index) {
  const mediaElement = document.createElement("article");
  
  if (mediaItem.image) {
    appendImage(mediaElement, mediaItem, index);
  } else if (mediaItem.video) {
    appendVideo(mediaElement, mediaItem, index);
  }
  
  const divLikeContainer = createLikeContainer(mediaItem);
  mediaElement.appendChild(divLikeContainer);
  
  return mediaElement;
}

function appendImage(mediaElement, mediaItem, index) {
  const imageElement = document.createElement("img");
  imageElement.tabIndex = 0;
  const photographerFolder = mediaItem.photographerId;
  imageElement.src = `./photos/imagesetvideos/${photographerFolder}/${mediaItem.image}`;
  
  addModalOpenListeners(imageElement, index);
  
  mediaElement.appendChild(imageElement);
}

function appendVideo(mediaElement, mediaItem, index) {
  const videoElement = document.createElement("video");
  const photographerFolder = mediaItem.photographerId;
  videoElement.src = `./photos/imagesetvideos/${photographerFolder}/${mediaItem.video}`;
  videoElement.tabIndex = 0;
  
  addModalOpenListeners(videoElement, index);
  
  mediaElement.appendChild(videoElement);
}

function addModalOpenListeners(element, index) {
  element.addEventListener("click", () => openModal(index));
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      openModal(index);
    }
  });
}

function createLikeContainer(mediaItem) {
  const divLikeContainer = document.createElement("div");
  divLikeContainer.classList.add("container-likes");
  
  const titleParagraph = document.createElement("p");
  titleParagraph.textContent = mediaItem.title;
  divLikeContainer.appendChild(titleParagraph);
  
  const likesParagraph = document.createElement("p");
  likesParagraph.textContent = mediaItem.likes;
  divLikeContainer.appendChild(likesParagraph);
  
  const heartLikes = createHeartButton();
  divLikeContainer.appendChild(heartLikes);
  
  const likesStyle = createLikesStyle(likesParagraph, heartLikes);
  divLikeContainer.appendChild(likesStyle);
  
  addLikeEventListener(heartLikes, mediaItem, likesParagraph);
  
  return divLikeContainer;
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

function displayMedia(media) {
  currentMedia = media;
  const mediaContainer = document.getElementById("media-container");
  mediaContainer.innerHTML = "";
  
  media.forEach((mediaItem, index) => {
    const mediaElement = createMediaElement(mediaItem, index);
    mediaContainer.appendChild(mediaElement);
  });
}

function createDropdown() {
  const options = ["Popularité", "Date", "Titre"];

  function createDropdownButton() {
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

    return { dropdownButton, titledropdown, fleche };
  }

  function createDropdownOptions() {
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
      return option;
    });

    optionElements.forEach(option => dropdownOptions.appendChild(option));

    return { dropdownOptions, optionElements };
  }

  const { dropdownButton, titledropdown, fleche } = createDropdownButton();
  const { dropdownOptions, optionElements } = createDropdownOptions();

  return {
    dropdownButton,
    titledropdown,
    fleche,
    dropdownOptions,
    optionElements
  };
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
