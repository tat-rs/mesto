//отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscCloseBind = this._handleEscClose.bind(this); //привязкаа this
  }

  //метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscCloseBind); //добавили слушатель закрытия по кнопке esc
  }

  //метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscCloseBind); //удалили слушатель закрытия по кнопке esc
  }

  //логика закрытия попапа по кнопке esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //слушатель клика иконки закрытия попапа и по области вокруг
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      //закрытие по оверлею
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      //закрытие по крестику
      } if(evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
