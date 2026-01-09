import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForms.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../components/utils.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addMemoryButton = document.querySelector(".profile__add-button");

const editProfileForm = document.forms["edit-profile"];
const addMemoryForm = document.forms["add-memory"];

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-preview-modal");
imagePopup.setEventListeners();

function createCard(data) {
  const card = new Card(data, "#memory-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".memories__container"
);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  (formData) => {
    userInfo.setUserInfo({ name: formData.name, job: formData.about });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

const addMemoryPopup = new PopupWithForm("#add-memory-modal", (formData) => {
  const newCard = createCard({
    name: formData.place,
    link: formData.image,
  });
  cardSection.addItem(newCard);
  addMemoryPopup.close();
  addMemoryValidator.resetValidation();
});
addMemoryPopup.setEventListeners();

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const addMemoryValidator = new FormValidator(validationConfig, addMemoryForm);

editProfileValidator.enableValidation();
addMemoryValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  editProfileForm.name.value = currentUserInfo.name;
  editProfileForm.about.value = currentUserInfo.job;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

addMemoryButton.addEventListener("click", () => {
  addMemoryForm.reset();
  addMemoryValidator.resetValidation();
  addMemoryPopup.open();
});
