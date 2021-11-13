import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(poopupSelector, submitForm) {
    super(poopupSelector);
    this._submitForm = submitForm;
    this._form = document.querySelector('.form');
  }

  // собирает данные всех полей формы
  _getInputValues() {
    this._inputValues = Array.from(this._popup).querySelectorAll('.form__item');
    const formPopup = {};
    this._inputValues.map((input) => {
      formPopup[input.name] = input.value;
    })
    console.log('djdjdj')
  }

  //обработчик клика по крестику, оверлею и сабмит формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => this._submitForm(this._getInputValues()));
  }

  //закрытие попапа и сброс формы
  close() {
    super.close();
    this._form.reset()
  }
}
