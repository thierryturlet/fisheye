/* eslint-disable no-unused-vars */

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  // Ajouter tabindex="0" au h2 pour qu'il soit focusable
  const modalTitle = document.querySelector(".modal header h2");
  modalTitle.setAttribute("tabindex", "0");

  

  // Sélectionner tous les éléments focusables y compris le h2
  const focusableElements = modal.querySelectorAll(
    "h2, input, button, textarea, select, [tabindex]:not([tabindex='-1'])"
  );

  const firstElement = focusableElements[0]; // Premier élément focusable
  const lastElement = focusableElements[focusableElements.length - 1]; // Dernier élément focusable

  firstElement.focus(); // Met le focus sur le titre h2 au départ

  // Gestion du piège de focus avec Tab et Shift + Tab
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) { 
        // Si Shift + Tab et on est sur le premier élément -> Retourne au dernier
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else { 
        // Si Tab et on est sur le dernier élément -> Retourne au premier
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
  namePhotographerModal();
}



8

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
  modal.setAttribute("aria-hidden", "true");
}
// Fermer la modale avec la touche Échap

const closeModalContact = document.getElementById("close-modal-contact");

closeModalContact.setAttribute("tabindex", "0");

closeModalContact.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeModal();
  }

});