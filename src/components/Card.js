export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id || null;
    this._owner = data.owner || null;
    this._isLiked = data.isLiked || false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick || null;
    this._handleLikeClick = handleLikeClick || null;
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
      if (this._handleLikeClick) {
        // Modo servidor
        this._handleLikeClick(this._id, this._isLiked);
      } else {
        // Modo local
        this._likeButton.classList.toggle("memories__like_active");
      }
    });

    // Botecito de basura
    this._deleteButton.addEventListener("click", () => {
      if (this._handleDeleteClick) {
        // Modo con confirmación
        this._handleDeleteClick(this._id);
      } else {
        // Modo directo
        this._element.remove();
        this._element = null;
      }
    });

    // Preview
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("memories__like_active");
    } else {
      this._likeButton.classList.remove("memories__like_active");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
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

    if (this._isLiked) {
      this._likeButton.classList.add("memories__like_active");
    }

    this._setEventListeners();

    return this._element;
  }
}
