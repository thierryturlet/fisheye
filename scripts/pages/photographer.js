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
      const photographerFolder = getPhotographerFolder(
        mediaItem.photographerId
      );

      imageElement.src = `./photos/imagesetvideos/${photographerFolder}/${mediaItem.image}`;
      mediaElement.appendChild(imageElement);
      console.log(imageElement);
    

    // Ajouter nom des images
    const nomImage = document.createElement("p");
    nomImage.textContent = mediaItem.title;
    mediaElement.appendChild(nomImage); // Ajouter le nom à l'intérieur de mediaElement
    console.log(nomImage);
    }

    else if (mediaItem.video) {

      // Ajouter une video

      const videoElement = document.createElement("video");
      const photographerFolder = getPhotographerFolder(
        mediaItem.photographerId
      );

      videoElement.src = `./photos/imagesetvideos/${photographerFolder}/${mediaItem.video}`;
      mediaElement.appendChild(videoElement);
      console.log(videoElement);

      // Ajouter nom des video
    const nomVideo = document.createElement("p");
    nomVideo.textContent = mediaItem.title;
    mediaElement.appendChild(nomVideo); // Ajouter le nom à l'intérieur de mediaElement
    console.log(nomVideo);
    
    }

    // Ajouter l'élément média au conteneur principal
    mediaContainer.appendChild(mediaElement);


  });
}



function getPhotographerFolder(photographerId) {
  // Retourner le nom du dossier photographe
  return photographerId;
}

main();
