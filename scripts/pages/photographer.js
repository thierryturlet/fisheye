async function main() {
  const params = new URLSearchParams(window.location.search);
  const  idFromUrl= params.get("id");
  console.log(idFromUrl);
  let photographer = await getPhotographerById(idFromUrl);

  let media = await getMediaPhotographer (idFromUrl);
  console.log(media);

  
  
  displayPhotographerInfo(photographer)

}



function displayPhotographerInfo(photographer) {

  document.getElementById("name-container").innerHTML = photographer.name;
  document.getElementById("infos-container").innerHTML = `${photographer.city}, ${photographer.country}`;
  document.getElementById("photographer-portrait").src = `./photos/Sample photos/Photographers ID Photos/${photographer.portrait}`;
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

  console.log(photographer.name)
  console.log(photographer.city,photographer.country)
  console.log(`./photos/Sample photos/Photographers ID Photos/${photographer.portrait}`);
  console.log(photographer.tagline)
  console.log(photographer.portrait)

}



main();
