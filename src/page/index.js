import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForms.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { initialCards } from "../components/utils.js";

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};

// API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "5cf18563-fdb4-4ac9-be8d-ba761c6a7341",
    "Content-Type": "application/json",
  },
});

const hasValidToken =
  api._headers.authorization !== "TU-TOKEN-AQUI" &&
  api._headers.authorization.length > 10;

let currentUserId = null;

function renderLoading(button, isLoading, loadingText = "Guardando...") {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    const form = button.closest(".modal__form");
    const formName = form ? form.getAttribute("name") : null;

    if (formName === "edit-profile") {
      button.textContent = "Guardar";
    } else if (formName === "add-memory") {
      button.textContent = "Guardar";
    } else if (formName === "edit-avatar") {
      button.textContent = "Guardar";
    } else if (formName === "delete-confirmation") {
      button.textContent = "Sí";
    } else {
      button.textContent = "Guardar";
    }
    button.disabled = false;
  }
}

const profileEditButton = document.querySelector(".profile__edit-button");
const addMemoryButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

const editProfileForm = document.forms["edit-profile"];
const addMemoryForm = document.forms["add-memory"];
const editAvatarForm = document.forms["edit-avatar"];

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

const imagePopup = new PopupWithImage("#image-preview-modal");
imagePopup.setEventListeners();

const deleteConfirmPopup = new PopupWithConfirmation(
  "#delete-confirmation-modal"
);
deleteConfirmPopup.setEventListeners();

function createCard(data) {
  const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
  };

  const handleDeleteClick = (cardId) => {
    deleteConfirmPopup.setSubmitAction(() => {
      const submitButton = deleteConfirmPopup._popup.querySelector(
        ".modal__save-button"
      );
      renderLoading(submitButton, true, "Eliminando...");

      if (hasValidToken) {
        api
          .deleteCard(cardId)
          .then(() => {
            card.removeCard();
            deleteConfirmPopup.close();
          })
          .catch((err) => console.log(`Error: ${err}`))
          .finally(() => {
            renderLoading(submitButton, false);
          });
      } else {
        setTimeout(() => {
          card.removeCard();
          deleteConfirmPopup.close();
          renderLoading(submitButton, false);
        }, 300);
      }
    });
    deleteConfirmPopup.open();
  };

  const handleLikeClick = (cardId, isLiked) => {
    if (hasValidToken) {
      const likePromise = isLiked
        ? api.removeLike(cardId)
        : api.addLike(cardId);
      likePromise
        .then((updatedCard) => {
          card.updateLikes(updatedCard.isLiked);
        })
        .catch((err) => console.log(`Error: ${err}`));
    } else {
      card.updateLikes(!isLiked);
    }
  };

  const card = new Card(
    data,
    "#memory-template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  );

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

const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  (formData) => {
    const submitButton = editProfileForm.querySelector(".modal__save-button");
    renderLoading(submitButton, true);

    if (hasValidToken) {
      api
        .editProfile(formData.name, formData.about)
        .then((userData) => {
          userInfo.setUserInfo({
            name: userData.name,
            job: userData.about,
          });
          editProfilePopup.close();
        })
        .catch((err) => console.log(`Error: ${err}`))
        .finally(() => {
          renderLoading(submitButton, false);
        });
    } else {
      setTimeout(() => {
        userInfo.setUserInfo({ name: formData.name, job: formData.about });
        editProfilePopup.close();
        renderLoading(submitButton, false);
      }, 300);
    }
  }
);
editProfilePopup.setEventListeners();

const addMemoryPopup = new PopupWithForm("#add-memory-modal", (formData) => {
  const submitButton = addMemoryForm.querySelector(".modal__save-button");
  renderLoading(submitButton, true, "Creando...");

  if (hasValidToken) {
    api
      .addCard(formData.place, formData.image)
      .then((newCard) => {
        const cardElement = createCard(newCard);
        cardSection.addItem(cardElement);
        addMemoryPopup.close();
        addMemoryValidator.resetValidation();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        renderLoading(submitButton, false);
      });
  } else {
    setTimeout(() => {
      const newCard = createCard({
        name: formData.place,
        link: formData.image,
        _id: `local-${Date.now()}`,
        owner: "local-user",
        isLiked: false,
      });
      cardSection.addItem(newCard);
      addMemoryPopup.close();
      addMemoryValidator.resetValidation();
      renderLoading(submitButton, false);
    }, 300);
  }
});
addMemoryPopup.setEventListeners();

// Editar
const editAvatarPopup = new PopupWithForm("#edit-avatar-modal", (formData) => {
  const submitButton = editAvatarForm.querySelector(".modal__save-button");
  renderLoading(submitButton, true);

  if (hasValidToken) {
    api
      .updateAvatar(formData.avatar)
      .then((userData) => {
        userInfo.setAvatar(userData.avatar);
        editAvatarPopup.close();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        renderLoading(submitButton, false);
      });
  } else {
    setTimeout(() => {
      userInfo.setAvatar(formData.avatar);
      editAvatarPopup.close();
      renderLoading(submitButton, false);
    }, 300);
  }
});
editAvatarPopup.setEventListeners();

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const addMemoryValidator = new FormValidator(validationConfig, addMemoryForm);
const editAvatarValidator = new FormValidator(validationConfig, editAvatarForm);

editProfileValidator.enableValidation();
addMemoryValidator.enableValidation();
editAvatarValidator.enableValidation();

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

if (avatarEditButton) {
  avatarEditButton.addEventListener("click", () => {
    editAvatarValidator.resetValidation();
    editAvatarPopup.open();
  });
}

if (hasValidToken) {
  console.log("Cargando desde servidor...");
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      userInfo.setUserInfo({ name: userData.name, job: userData.about });
      userInfo.setAvatar(userData.avatar);

      cardSection._items = cards;
      cardSection.renderItems();
    })
    .catch((err) => {
      console.log(`Error: ${err}. Usando datos locales.`);
      loadLocalData();
    });
} else {
  console.log("Usando datos locales...");
  loadLocalData();
}

function loadLocalData() {
  currentUserId = "local-user";
  const localCards = initialCards.map((card, i) => ({
    ...card,
    _id: `local-${i}`,
    owner: "local-user",
    isLiked: false,
  }));
  cardSection._items = localCards;
  cardSection.renderItems();
}
