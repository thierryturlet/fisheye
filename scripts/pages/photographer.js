async function main() {
  const params = new URLSearchParams(window.location.search);
  const idFromUrl = params.get("id");
  console.log(idFromUrl);
  let photographer = await getPhotographerById(idFromUrl);

  let media = await getMediaPhotographer(idFromUrl);
  console.log(media);

  displayPhotographerInfo(photographer);
  displayMedia(media);
}

function displayPhotographerInfo(photographer) {
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

      imageElement.src = "./photos/imagesetvideos/" + photographerFolder + "/" + mediaItem.image;
      mediaElement.appendChild(imageElement);
      console.log(imageElement);

      // Créer une div pour le titre et les likes
      const divLikeContainer = document.createElement("div");
      divLikeContainer.classList.add("container-likes")
      // Ajouter un paragraphe pour le titre
      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = mediaItem.title;
      divLikeContainer.appendChild(titleParagraph); // Ajouter le titre à la div

      // Ajouter un paragraphe pour les likes
      const likesParagraph = document.createElement("p");
      likesParagraph.textContent = mediaItem.likes;
      divLikeContainer.appendChild(likesParagraph); // Ajouter les likes à la div

      // Ajouter la div au mediaElement
      mediaElement.appendChild(divLikeContainer);
      console.log(divLikeContainer);

    } else if (mediaItem.video) {
      // Ajouter une vidéo
      const videoElement = document.createElement("video");
      const photographerFolder = mediaItem.photographerId;

      videoElement.src = "./photos/imagesetvideos/" + photographerFolder + "/" + mediaItem.video;
      videoElement.controls = true; // Ajout des contrôles pour la vidéo
      mediaElement.appendChild(videoElement);
      console.log(videoElement);

      // Créer une div pour le titre et les likes
      const divLikeContainer = document.createElement("div");
      divLikeContainer.classList.add("container-likes")

      // Ajouter un paragraphe pour le titre
      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = mediaItem.title;
      divLikeContainer.appendChild(titleParagraph); // Ajouter le titre à la div

      // Ajouter un paragraphe pour les likes
      const likesParagraph = document.createElement("p");
      likesParagraph.textContent = mediaItem.likes;
      divLikeContainer.appendChild(likesParagraph); // Ajouter les likes à la div

      // Ajouter la div au mediaElement
      mediaElement.appendChild(divLikeContainer);
      console.log(divLikeContainer);
    }

    // Ajouter l'élément média au conteneur principal
    mediaContainer.appendChild(mediaElement);
  });
}


main();
