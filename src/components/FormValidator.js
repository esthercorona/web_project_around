export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass || "modal__input-error_visible";

    this._button = this._formElement.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `.modal__input-error_${input.name}`
    );
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    }
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `.modal__input-error_${input.name}`
    );
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  }

  _toggleButtonState() {
    const isInvalid = this._inputs.some((input) => !input.validity.valid);

    if (isInvalid) {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
      this._hideInputError(input);
    });
  }
}
