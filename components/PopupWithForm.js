import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector('.form');
  }

  // собирает данные всех полей формы
  _getInputValues() {
    // достаём все элементы полей
    this._inputList = Array.from(this._popup.querySelectorAll('.form__item'));
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues
  }

  //обработчик клика по крестику, оверлею и сабмит формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }

  //закрытие попапа и сброс формы
  close() {
    super.close();
    this._form.reset()
  }
}
