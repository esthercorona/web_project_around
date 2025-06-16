// Verificación de funcionalidad del modal

let modal = document.getElementById("edit-profile-modal");
let openModalButton = document.querySelector(".profile__edit-button");
let closeModalButton = modal.querySelector(".modal__close-button");
let form = modal.querySelector(".modal__form");
let nameInput = form.elements.name;
let aboutInput = form.elements.about;
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

// Verificar que los elementos existen
console.log({ modal, openModalButton, closeModalButton, form, nameInput, aboutInput, profileName, profileDescription });

// Función para abrir modal
function abrirFormulario() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  modal.classList.add("modal_opened");
  console.log("Modal abierto");
}

// Función para cerrar modal
function cerrarFormulario() {
  modal.classList.remove("modal_opened");
  console.log("Modal cerrado");
}

// Guardar cambios del formulario
function guardarFormulario(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  cerrarFormulario();
  console.log("Formulario guardado");
}

// Eventos seguros (solo si los botones existen)
if (openModalButton) openModalButton.addEventListener("click", abrirFormulario);
if (closeModalButton) closeModalButton.addEventListener("click", cerrarFormulario);
if (form) form.addEventListener("submit", guardarFormulario);
