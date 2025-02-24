function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";

 
  const formName = document.querySelector(".modal header h2");
  formName.focus();                       
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

//Ajout du nom du photographe

function namePhotographerModal(name) {
  const formName = document.querySelector(".modal header h2");

  formName.id = "focus-modal";
  formName.setAttribute("tabindex", "-1"); //ajout du focus sur le H2

  const photographerName = document.createElement("span");
  photographerName.textContent = name;

  photographerName.style.display = "block";
  formName.appendChild(photographerName);
}

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
// Fermer la modale avec la touche Échap

const closeModalContact = document.getElementById("close-modal-contact");

closeModalContact.setAttribute("tabindex", "0");

closeModalContact.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeModal();
  }

});