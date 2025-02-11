function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

let form = document.querySelector("form");
console.log(form);
form.addEventListener("submit",(event) => {
    event.preventDefault();
    

let inputPrenom = document.getElementById("prenom").value;
let inputNom = document.getElementById("nom").value;
let inputEmail = document.getElementById("email").value;
let inputMessage = document.getElementById("message").value;



console.log("Prénom :", inputPrenom);
    console.log("Nom :", inputNom);
    console.log("Email :", inputEmail);
    console.log("Message :", inputMessage);
});