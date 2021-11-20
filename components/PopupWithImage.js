import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageName = this._popup.querySelector('.popup__subtitle');//описания картинки в попапе просмотра изображения
    this._popupImageLink = this._popup.querySelector('.popup__image');//ссылки на картинку в попапе просмотра изображения
  }

  //метод открытия попапа изображения
  open({data}) {
    this._popupImageName.textContent = data.name; //пиравниваем название карточки
    this._popupImageLink.src = data.link; //приравниваем ссылки на изображения
    this._popupImageLink.alt = data.name;//приравниеваме alt с названием карточки
    super.open()
  };
}

