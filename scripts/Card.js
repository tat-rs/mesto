import { openPopup } from "./index.js";

export class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.cards__image');
    this._cardSubtitle = this._element.querySelector('.cards__subtitle');

    this._setEventListeners();

    this._cardSubtitle.textContent = this._name;
    //присваиваем значение ссылки на изображение новой карточки равной ключу link массива
    this._cardImage.src = this._link; // добавили адрес изображение из массива карточек
    this._cardImage.alt = this._name; // добавили описание в атрибут alt, равное названию карточки

    return this._element;
  }

  _toggleLike() {
    this._element.querySelector('.cards__button').classList.toggle('cards__button_active'); //добавляем или убираем класс cards__button_active у элемента
  }

  _deleteCard() {
    this._element.closest('.cards__item').remove(); //удаляем блок карточки
  }

  _showImage() {
    const popupOpenImage = document.querySelector('.popup_type_image'); //попап просмотра изображения
    const popupImageName = popupOpenImage.querySelector('.popup__subtitle'); //поле ввода описания картинки в попапе просмотра изображения
    const popupImageLink = popupOpenImage.querySelector('.popup__image'); //поле ввода ссылки на картинку в попапе просмотра изображения
    openPopup(popupOpenImage)
      popupImageName.textContent = this._name; //приравниваем текстовые содержания
      popupImageLink.src = this._link; //приравниваем ссылки на изображения
      popupImageLink.alt = this._name; //заполняем альт названием карточки
  }

  _setEventListeners() {
    this._element.querySelector('.cards__button').addEventListener('click', () => this._toggleLike());
    this._element.querySelector('.cards__delete').addEventListener('click', () => this._deleteCard());//добавили слушатель для удаления карточки
    this._cardImage.addEventListener('click', () => this._showImage());
  }

}
