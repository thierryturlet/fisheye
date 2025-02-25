

function displayPhotographers(photographers) {
  const photographersContainer = document.getElementById("photographers");

  // Boucler sur chaque photographe
  photographers.forEach((photographer,index) => {
    // Créer un élément pour chaque photographe
    const photographerElement = document.createElement("article");
    photographerElement.classList.add("photographer");

    const uniqueId = `photographer-name-${index}`;

    // Ajout du lien
    const linkElement = document.createElement("a");
    linkElement.href = "photographer.html";
    linkElement.setAttribute('aria-labelledby',uniqueId);
    photographerElement.appendChild(linkElement);

    // Ajouter une image
    const imageElement = document.createElement("img");
    imageElement.src = `./photos/samplephotos/photographersidphotos/${photographer.portrait}`;
    imageElement.alt = "";
    linkElement.appendChild(imageElement);

    // Ajouter le nom du photographe
    const nameElement = document.createElement("h2");
    nameElement.textContent = photographer.name;
    nameElement.id = uniqueId;
    linkElement.appendChild(nameElement);

    // Ajout des villes et pays sur la même ligne
    const locationElement = document.createElement("p");
    locationElement.textContent = `${photographer.country}, ${photographer.city}`;
    photographerElement.appendChild(locationElement);
    locationElement.classList.add("photographer-location");

    // Ajout des infos du photographe
    const infoElement = document.createElement("p");
    infoElement.textContent = photographer.tagline;
    photographerElement.appendChild(infoElement);
    infoElement.classList.add("photographer-tagline");

    // Ajout des prix
    const priceElement = document.createElement("p");
    priceElement.textContent = `${photographer.price} €/jour`;
    photographerElement.appendChild(priceElement);
    priceElement.classList.add("photographer-price");

    // Ajouter l'élément au conteneur
    photographersContainer.appendChild(photographerElement);

    // ajout des liens pour le sphotographes

    linkElement.href = `photographer.html?id=${photographer.id}`;
  });
}

async function main() {
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}
main();
