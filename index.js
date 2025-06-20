let modal = document.getElementById("edit-profile-modal");
let openModalButton = document.querySelector(".profile__edit-button");
let closeModalButton = modal.querySelector(".modal__close-button");
let form = modal.querySelector(".modal__form");
let nameInput = form.elements.name;
let aboutInput = form.elements.about;
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

function abrirFormulario() {
  nameInput.value = "";
  aboutInput.value = "";
  modal.classList.add("modal_opened");
}

function cerrarFormulario() {
  modal.classList.remove("modal_opened");
}

function guardarFormulario(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  cerrarFormulario();
}

openModalButton.addEventListener("click", abrirFormulario);
closeModalButton.addEventListener("click", cerrarFormulario);
form.addEventListener("submit", guardarFormulario);


let addModal = document.getElementById("add-memory-modal");
let openAddButton = document.querySelector(".profile__add-button");
let closeAddButton = addModal.querySelector(".modal__close-button");
let addForm = addModal.querySelector(".modal__form");


function abrirAgregarModal() {
  addForm.reset(); 
  addModal.classList.add("modal_opened");
}

function cerrarAgregarModal() {
  addModal.classList.remove("modal_opened");
}

function guardarNuevoRecuerdo(evt) {
  evt.preventDefault();
  const lugar = addForm.elements.place.value;
  const imagen = addForm.elements.image.value;

  console.log("Lugar:", lugar);
  console.log("Imagen:", imagen);

  cerrarAgregarModal();
}

openAddButton.addEventListener("click", abrirAgregarModal);
closeAddButton.addEventListener("click", cerrarAgregarModal);
addForm.addEventListener("submit", guardarNuevoRecuerdo);


// corazoncito
document.querySelectorAll('.memories__icon').forEach((icon) => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('memories__icon--active');
  });
});
