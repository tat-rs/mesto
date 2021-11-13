import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageName = this._popup.querySelector('.popup__subtitle');//описания картинки в попапе просмотра изображения
    this._popupImageLink = this._popup.querySelector('.popup__image');//ссылки на картинку в попапе просмотра изображения
  }

  open({data}) {
    this._popupImageName.textContent = data.name;
    this._popupImageLink.src = data.link;
    this._popupImageLink.alt = data.name;
    super.open()
  }
}

