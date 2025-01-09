async function getPhotographers ()
{
    const response = await fetch ("http://127.0.0.1:5500/data/photographers.json")
    
    const data = await response.json()
   
    return data.photographers
}

function displayPhotographers (photographers){
  
        const photographersContainer = document.getElementById('photographers');
    
            // Boucler sur chaque photographe

            photographers.forEach(photographer => {
            // Créer un élément pour chaque photographe
            const photographerElement = document.createElement('article');
            photographerElement.classList.add('photographer');
           
            // Ajouter une image 
           
            const imageElement = document.createElement('img');
            imageElement.src = `./photos/Sample photos/Photographers ID Photos/${photographer.portrait}`;
            photographerElement.appendChild(imageElement);

            // Ajouter le nom du photographe
            const nameElement = document.createElement('h2');
            nameElement.textContent = photographer.name;
            photographerElement.appendChild(nameElement);         

            // Ajout des villes et pays sur la même ligne
            const locationElement = document.createElement('p');
            locationElement.textContent = `${photographer.country}, ${photographer.city}`;
            photographerElement.appendChild(locationElement);
            locationElement.classList.add('photographer-location');


             // Ajout des infos du photographe
            const infoElement = document.createElement('p');
            infoElement.textContent = photographer.tagline;
            photographerElement.appendChild(infoElement)
            infoElement.classList.add('photographer-tagline');

            // Ajout des prix
            const priceElement = document.createElement('p');
            priceElement.textContent = `${photographer.price} €/jour`;
            photographerElement.appendChild(priceElement)
            priceElement.classList.add('photographer-price')
    
            // Ajouter l'élément au conteneur
            photographersContainer.appendChild(photographerElement);
        });
    }
    





async function main(){
    const photographers = await getPhotographers()
 displayPhotographers(photographers)  
}   

main()