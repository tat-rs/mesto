//отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._listenerBind = this._handleEscClose.bind(this); //привязкаа this
  }

  //метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._listenerBind)
  }

  //метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._listenerBind);
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
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      } if(evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
