//передаваемый объект настроек всех нужных классов и селекторов элементов
export const validationConfig = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_state_invalid',
};

export class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formSelector = formSelector;
    this._form = document.querySelector(this._formSelector);
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputsList = this._form.querySelectorAll(this._inputSelector);
  }

  _showError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  hideError() {
    Array.from(this._inputsList).forEach(inputElement => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      errorElement.textContent = '';
      inputElement.classList.remove(this._inputErrorClass);
    });
  }

  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    if(isInputNotValid) {
      this._showError(errorElement, inputElement)
    } else {
      this.hideError()
    }
  }

  _hasInvalidInput() {
    const invalidInput = !this._form.checkValidity();
    return invalidInput
  }

  _toggleButtonState() {
    const invalidInput = this._hasInvalidInput()
    if(invalidInput) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = 'disabled';
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

    //устанавливаем обработчик полям ввода формы
  _setEventListener() {
    this._toggleButtonState()

    Array.from(this._inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        /* const isFormValid = this._form.checkValidity(); */
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      })
    })

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  };

  enableValidation() {
    this._setEventListener();
  }

}

const formVal1 = new FormValidator(validationConfig, '.form_type_add')
const formVal2 = new FormValidator(validationConfig, '.form_type_edit')
formVal1.enableValidation()
formVal2.enableValidation()
