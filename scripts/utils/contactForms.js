function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

//Ajout du nom du photographe

const nameToDisplay = "jhon lens"

function namePhotographerModal(name){

const formName = document.querySelector(".modal header h2");

const photographerName = document.createElement("span");
photographerName.textContent = name;

photographerName.style.display = "block";
formName.appendChild(photographerName);

}
namePhotographerModal(nameToDisplay)


// gestion du formulaire

const form = document.querySelector("form");
console.log(form);
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputPrenom = document.getElementById("prenom").value;
  const inputNom = document.getElementById("nom").value;
  const inputEmail = document.getElementById("email").value;
  const inputMessage = document.getElementById("message").value;

  console.log("Prénom :", inputPrenom);
  console.log("Nom :", inputNom);
  console.log("Email :", inputEmail);
  console.log("Message :", inputMessage);

  // Fermer la modale après soumission
  closeModal();
  form.reset();
});

// Fonction pour fermer la modale
function closeModal() {
  let modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
