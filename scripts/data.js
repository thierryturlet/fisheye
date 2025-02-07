async function getPhotographers() {
  const response = await fetch("http://127.0.0.1:5500/data/photographers.json");

  const data = await response.json();

  return data.photographers;
}

async function getPhotographerById(id) {
  const response = await fetch("http://127.0.0.1:5500/data/photographers.json");

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
  const response = await fetch("http://127.0.0.1:5500/data/photographers.json");

  const data = await response.json();

  let mediaList = data.media;
  console.log(id);
  console.log(mediaList);

  let mediaToFind = mediaList.filter((media) => media.photographerId == id);
  console.log(mediaToFind);

  return mediaToFind;
}

async function getLikesPhotographer(id) {
  const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
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

async function sortMediaByPopularity(photographerId) {
  const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
  const data = await response.json();
  let mediaList = data.media;

  // Filtrer les médias du photographe spécifié
  mediaList = mediaList.filter((media) => media.photographerId === photographerId);

  // Trier les médias par nombre de likes (du plus grand au plus petit)
  mediaList.sort((a, b) => b.likes - a.likes);
  console.log("🔥 Médias après tri :", mediaList);

  return mediaList;
}

async function sortMediaByDate(photographerId) {
  const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
  const data = await response.json();
  let mediaList = data.media;

  mediaList = mediaList.filter((media) => media.photographerId === photographerId);
  mediaList.sort((a, b) => new Date(b.date) - new Date(a.date)); // Trier par date décroissante

  return mediaList;
}

async function sortMediaByTitle(photographerId) {
  const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
  const data = await response.json();
  let mediaList = data.media;

  mediaList = mediaList.filter((media) => media.photographerId === photographerId);
  mediaList.sort((a, b) => a.title.localeCompare(b.title)); // Trier par ordre alphabétique

  return mediaList;
}




