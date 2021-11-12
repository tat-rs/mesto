import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageName = this._popup.querySelector('.popup__subtitle');//описания картинки в попапе просмотра изображения
    this._popupImageLink = this._popup.querySelector('.popup__image');//ссылки на картинку в попапе просмотра изображения
  }

  open(element) {
    this._popupImageName.textContent = element.name;
    this._popupImageLink.src = element.link;
    this._popupImageLink.alt = element.name;
    super.open()
  }
}

/*const popupOpenImage = document.querySelector('.popup_type_image'); //попап просмотра изображения
const popupImageName = popupOpenImage.querySelector('.popup__subtitle'); //поле ввода описания картинки в попапе просмотра изображения
const popupImageLink = popupOpenImage.querySelector('.popup__image'); //поле ввода ссылки на картинку в попапе просмотра изображения */

/*   //метод, открываюзий попап с изображением
  _showImage() {
    openPopup(popupOpenImage) //открываем попап с изображением
      popupImageName.textContent = this._name; //приравниваем текстовые содержания
      popupImageLink.src = this._link; //приравниваем ссылки на изображения
      popupImageLink.alt = this._name; //заполняем альт названием карточки
  };
 */
