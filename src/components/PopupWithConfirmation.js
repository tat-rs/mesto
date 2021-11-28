import Popup from "./Popup.js";
//попап с предупреждением
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
  }

  //метод проброса данных
  setDataSubmit(dataId) {
    this._deletedCardId = dataId
  }
  //обработчик клика по крестику, оверлею и сабмит формы
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); //отменяем действие по умолчанию
      this._handleFormSubmit(this._deletedCardId) //пробрасываем в функцию id
    });
  };
}
