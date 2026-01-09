export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".memories__item")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // Corazoncito
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("memories__like_active");
    });

    // Botecito de basura
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    // Preview
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".memories__image");
    this._title = this._element.querySelector(".memories__title");
    this._likeButton = this._element.querySelector(".memories__like");
    this._deleteButton = this._element.querySelector(
      ".memories__delete-button"
    );

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
