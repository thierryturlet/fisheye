async function main() {
  const params = new URLSearchParams(window.location.search);
  const idFromUrl =  parseInt(params.get("id")); // Convertir en nombre
  console.log(idFromUrl);

  let photographer = await getPhotographerById(idFromUrl);
  let media = await getMediaPhotographer(idFromUrl);
  console.log(media);

  // Récupérer le total des likes
  const totalLikes = await getLikesPhotographer(idFromUrl);

  displayPhotographerInfo(photographer, totalLikes);
  displayMedia(media, totalLikes); // Passer totalLikes à displayMedia

  displayDropdown();

  let sortedMedia = await sortMediaByPopularity(idFromUrl);
  console.log("🔥 Médias triés par popularité :", sortedMedia);

  const sorteMediaDate = await sortMediaByDate(idFromUrl) ;
  console.log(sorteMediaDate);

  const sorteMediaTitle = await sortMediaByTitle(idFromUrl) ;
  console.log(sorteMediaTitle);

   sortedMedia = await sortMediaByPopularity(idFromUrl);
  displayMedia(sortedMedia);

  document.querySelectorAll(".option-title").forEach((option) => {
    option.addEventListener("click", async () => {
      const dropdownTitle = document.querySelector(".dropdown-title")
      let selectedOption = dropdownTitle.textContent;

      if (selectedOption === "Popularité") {
        sortedMedia = await sortMediaByPopularity(idFromUrl);
      } else if (selectedOption === "Date") {
        sortedMedia = await sortMediaByDate(idFromUrl);
      } else if (selectedOption === "Titre") {
        sortedMedia = await sortMediaByTitle(idFromUrl);
      }

      displayMedia(sortedMedia);
    });
  });



}

function displayPhotographerInfo(photographer, totalLikes) {
  document.getElementById("name-container").innerHTML = photographer.name;
  document.getElementById(
    "infos-container"
  ).innerHTML = `${photographer.city}, ${photographer.country}`;
  document.getElementById(
    "photographer-portrait"
  ).src = `./photos/Sample photos/Photographers ID Photos/${photographer.portrait}`;
  document.getElementById("tagline-container").innerHTML = photographer.tagline;

  // ajout des class css
  const nameContainer = document.getElementById("name-container");
  nameContainer.innerHTML = photographer.name;
  nameContainer.classList.add("photographer-name");

  const infosContainer = document.getElementById("infos-container");
  infosContainer.innerHTML = `${photographer.city}, ${photographer.country}`;
  infosContainer.classList.add("photographer-location");

  const photographerPortrait = document.getElementById("photographer-portrait");
  photographerPortrait.src = `./photos/Sample photos/Photographers ID Photos/${photographer.portrait}`;
  photographerPortrait.classList.add("photographer-portrait-image");

  const taglineContainer = document.getElementById("tagline-container");
  taglineContainer.innerHTML = photographer.tagline;
  taglineContainer.classList.add("photographer-tagline");

  console.log(photographer.name);
  console.log(photographer.city, photographer.country);
  console.log(
    `./photos/Sample photos/Photographers ID Photos/${photographer.portrait}`
  );
  console.log(photographer.tagline);
  console.log(photographer.portrait);

  //Ajout de la banniere like et prix joiurnalier

  const likesElement = document.querySelector(".totalikes");
  likesElement.textContent = totalLikes;

  const priceElement = document.querySelector(".tarifjournalier");
  priceElement.textContent = `${photographer.price} €/jour`;
}

function displayMedia(media) {
  const mediaContainer = document.getElementById("media-container");
    mediaContainer.innerHTML ="";
  
  // Boucler sur chaque media
  media.forEach((mediaItem) => {
    

    // Créer un élément pour chaque media
    const mediaElement = document.createElement("article");
    console.log(mediaElement);

    if (mediaItem.image) {
      // Ajouter une image
      const imageElement = document.createElement("img");
      const photographerFolder = mediaItem.photographerId;

      imageElement.src =
        "./photos/imagesetvideos/" + photographerFolder + "/" + mediaItem.image;
      mediaElement.appendChild(imageElement);
      console.log(imageElement);
    } else if (mediaItem.video) {
      // Ajouter une vidéo
      const videoElement = document.createElement("video");
      const photographerFolder = mediaItem.photographerId;

      videoElement.src =
        "./photos/imagesetvideos/" + photographerFolder + "/" + mediaItem.video;
      videoElement.controls = true; // Ajout des contrôles pour la vidéo
      mediaElement.appendChild(videoElement);
      console.log(videoElement);
    }

    // Créer une div pour le titre et les likes
    const divLikeContainer = document.createElement("div");
    divLikeContainer.classList.add("container-likes");

    // Ajouter un paragraphe pour le titre
    const titleParagraph = document.createElement("p");
    titleParagraph.textContent = mediaItem.title;
    divLikeContainer.appendChild(titleParagraph); // Ajouter le titre à la div

    // Ajouter un paragraphe pour les likes
    const likesParagraph = document.createElement("p");
    likesParagraph.textContent = mediaItem.likes;
    divLikeContainer.appendChild(likesParagraph); // Ajouter les likes à la div

    //Ajout des coeurs

    const heartLikes = document.createElement("i");
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
    console.log(divLikeContainer);

    // Ajouter l'élément média au conteneur principal
    mediaContainer.appendChild(mediaElement);
  });
}

function displayDropdown() {
  const dropdownContainer = document.querySelector("#dropdown-container");

  const options = ["Popularité", "Date", "Titre"];

  const dropdownButton = document.createElement("div");
  dropdownButton.classList.add("title-dropdown");

  // Élément qui affiche l'option sélectionnée
  const titledropdown = document.createElement("span");
  titledropdown.textContent = options[0]; // Par défaut "Popularité"
  titledropdown.classList.add("dropdown-title");
  dropdownButton.appendChild(titledropdown);

  // Icône de flèche
  const fleche = document.createElement("i");
  fleche.classList.add("fa-solid", "fa-angle-up");
  dropdownButton.appendChild(fleche);
  dropdownContainer.appendChild(dropdownButton);

  // Conteneur des options
  const dropdownOptions = document.createElement("div");
  dropdownOptions.classList.add("dropdown-options", "close");

  options.slice(1).forEach((optionText) => {
    const option = document.createElement("span");
    option.textContent = optionText;
    option.classList.add("option-title");

    // Ajout d'un événement de clic sur chaque option
    option.addEventListener("click", () => {
      // Échange des valeurs
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
    fleche.classList.replace("fa-angle-up", "fa-chevron-down");
    dropdownOptions.classList.replace("close", "open");
    dropdownButton.style.borderBottom = '1px solid white';
  }

  function closeDropdown() {
    fleche.classList.replace("fa-chevron-down", "fa-angle-up");
    dropdownOptions.classList.replace("open", "close");
    dropdownButton.style.borderBottom = 'none';
  }
}



main();
