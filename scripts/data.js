async function getPhotographers() {
  const response = await fetch("./data/photographers.json");

  const data = await response.json();

  return data.photographers;
}

async function getPhotographerById(id) {
  const response = await fetch("./data/photographers.json");

  const data = await response.json();

  let photographerList = data.photographers;
  console.log(id);
  console.log(photographerList);
  let photographerToFind = null;

  photographerList.forEach((photographer) => {
    if (id == photographer.id) {
      photographerToFind = photographer;
    }
  });
  return photographerToFind;
}

async function getMediaPhotographer(id) {
  const response = await fetch("./data/photographers.json");

  const data = await response.json();

  let mediaList = data.media;
  console.log(id);
  console.log(mediaList);

  let mediaToFind = mediaList.filter((media) => media.photographerId == id);
  console.log(mediaToFind);

  return mediaToFind;
}

async function getLikesPhotographer(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  let mediaList = data.media;

  // Filtre les médias du photographe spécifié
  
  let photographerMedia = mediaList.filter(
    (media) => media.photographerId == id
  );

  // Récupère tous les likes dans un tableau
  let allLikes = [];
  photographerMedia.forEach((media) => {
    if (media.likes) {
      allLikes.push(media.likes);
    }
  });

  // Additionne tous les likes
  let totalLikes = 0;
  for (let like of allLikes) {
    totalLikes += like;
  }

  console.log(`Total likes for photographer ${id}: ${totalLikes}`);
  return totalLikes;
}





