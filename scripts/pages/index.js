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
                const photographerElement = document.createElement('div');
                photographerElement.classList.add('photographer');
           
            // Ajouter une image si disponible
            if (photographer.portrait) {
                const imageElement = document.createElement('img');
                imageElement.src = `./photos/Sample photos/Photographers ID Photos/${photographer.portrait}`;
                photographerElement.appendChild(imageElement);

            // Ajouter le nom du photographe
            const nameElement = document.createElement('h2');
            nameElement.textContent = photographer.name;
            photographerElement.appendChild(nameElement);



            }
    
            // Ajouter l'élément au conteneur
            photographersContainer.appendChild(photographerElement);
        });
    }
    





async function main(){
    const photographers = await getPhotographers()
 displayPhotographers(photographers)  
}   

main()