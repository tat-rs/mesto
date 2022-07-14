import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = Array.from(this._popup.querySelectorAll('.form__item')); //массив с инпутами
    this._button = this._form.querySelector('.form__button');
    this._defaultTextofButton = this._button.textContent;
  }

  // собирает данные всех полей формы
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues
  };

  renderLoading(isLoading) {
    if(isLoading) {
      this._button.textContent = "Сохранение..."
      this._button.classList.add('loader')
    } else {
      this._button.textContent = this._defaultTextofButton
    }
  }
  //обработчик клика по крестику, оверлею и сабмит формы
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true)
      this._handleFormSubmit(this._getInputValues())
    });
  };

  //закрытие попапа и сброс формы
  close() {
    super.close();
    this._form.reset()
  };
}
