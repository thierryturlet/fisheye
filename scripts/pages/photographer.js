async function main() {
  const params = new URLSearchParams(window.location.search);
  const idFromUrl = params.get("id");
  console.log(idFromUrl);

  let photographer = await getPhotographerById(idFromUrl);
  let media = await getMediaPhotographer(idFromUrl);
  console.log(media);

  // Récupérer le total des likes
  const totalLikes = await getLikesPhotographer(idFromUrl);

  displayPhotographerInfo(photographer, totalLikes);
  displayMedia(media, totalLikes); // Passer totalLikes à displayMedia

  displayDropdown()
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
  // Boucler sur chaque media
  media.forEach((mediaItem) => {
    const mediaContainer = document.getElementById("media-container");
    console.log(mediaContainer);

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


function displayDropdown(){

  const dropdownContainer = document.querySelector("#dropdown-container");
  console.log(dropdownContainer)
  
  // Ajoutez le texte "Popularité"
  const titledropdown = document.createElement("span");
  titledropdown.textContent = "Popularité";
  dropdownContainer.appendChild(titledropdown);
 
  
   // Créez l'icône de flèche vers le haut
   const fleche = document.createElement("i");
   fleche.classList.add("fa-solid", "fa-angle-up");
   dropdownContainer.appendChild(fleche)

    // Ajoutez un événement de clic à la flèche
    fleche.addEventListener("click", () => {
      // Change l'icône en fonction de son état actuel
      if (fleche.classList.contains("fa-angle-up")) {
        fleche.classList.remove("fa-angle-up"); // Retire l'icône vers le haut
        fleche.classList.add("fa-chevron-down"); // Ajoute l'icône vers le bas
      } else {
        fleche.classList.remove("fa-chevron-down"); // Retire l'icône vers le bas
        fleche.classList.add("fa-angle-up"); // Remet l'icône vers le haut
      }


    });


}

main();
