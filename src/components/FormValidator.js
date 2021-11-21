//передаваемый объект настроек всех нужных классов и селекторов элементов формы
export const validationConfig = {
  inputSelector: '.form__item', //селектор инпута формы
  submitButtonSelector: '.form__button', //селектор кнопки формы
  inactiveButtonClass: 'form__button_disabled', //класс кнопки с неактивными стилями
  inputErrorClass: 'form__item_state_invalid', // класс инпута со стилями ошибки
};

//создаем класс валидации формы
export default class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formSelector = formSelector;
    this._form = document.querySelector(this._formSelector); //нашли саму валидирумую форму
    this._button = this._form.querySelector(this._submitButtonSelector); //нашли кнопку в форме
    this._inputsList = this._form.querySelectorAll(this._inputSelector); // нашли все инпуты формы
  };

  //метод, показывающий ошибку валидации
  _showError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); //находим элемент ошибки инпут
    errorElement.textContent = inputElement.validationMessage; //добавляем текст ошибки
    inputElement.classList.add(this._inputErrorClass); //добавляем инпуту класс со стилями ошибки
  };

  //метод, скрывающий ошибки валидации
  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); //находим элемент ошибки инпут
    errorElement.textContent = ''; //обнуляем текст с ошибкой валидации
    inputElement.classList.remove(this._inputErrorClass); //удаляем класс со стилем ошибки
  };

  //метод проверки валидности поля формы
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid; //сохраняем в переменную невалидный инпут
    if(isInputNotValid) {
      this._showError(inputElement) //вызов метода с ошибкой валидации
    } else {
      this._hideError(inputElement) //вызов метода, скрывающий ошибку валидации
    }
  };

  //метод, возвращающий валидное поле ввода
  _hasInvalidInput() {
    const invalidInput = this._form.checkValidity();
    return invalidInput
  };

  //метод активации и дезактивации кнопки
  _toggleButtonState() {
    const invalidInput = this._hasInvalidInput(); //сохраняем в переменную валидное поле ввода

    if(!invalidInput) {
      this._button.classList.add(this._inactiveButtonClass); //добавляем стили неактивной кнопки для невалидного поля
      this._button.disabled = 'disabled';
    } else {
      this._button.classList.remove(this._inactiveButtonClass); //убираем стили неактивной кнопки для невалидного поля
      this._button.disabled = false;
    }
  };

  //метод очистки ошибок и деактивации кнопки
  resetValidation() {
    this._toggleButtonState(); //блокируем кнопку сабмита до ввода значений в поле формы

    this._inputsList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  }

  //устанавливаем обработчик полям ввода формы
  _setEventListener() {
    this._toggleButtonState(); //блокируем кнопку сабмита до ввода значений в поле формы

    // перебираем массив полей ввода
    Array.from(this._inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement); //при вводе в поле ввода провяертся валидность поля
        this._toggleButtonState(); //блокируем или активизируем кнопку сабмита в зависимости от валидности
      });
    });

    //отменяем действия сабмита по умолчанию
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  };

  //метод валидации формы
  enableValidation() {
    this._setEventListener();
  };

};
