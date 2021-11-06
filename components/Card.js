import { openPopup } from "../scripts/index.js"; //импортируем функцию открытия попапа

const popupOpenImage = document.querySelector('.popup_type_image'); //попап просмотра изображения
const popupImageName = popupOpenImage.querySelector('.popup__subtitle'); //поле ввода описания картинки в попапе просмотра изображения
const popupImageLink = popupOpenImage.querySelector('.popup__image'); //поле ввода ссылки на картинку в попапе просмотра изображения

//создаем класс карточки
export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  };

  //метод получения разметки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true); //клонируем разметку карточки

    return cardElement;
  };

  //метод постановки лайка карточке
  _toggleLike() {
    this._likeButton.classList.toggle('cards__button_active'); //добавляем или убираем класс с активным лайком у элемента
  };

  //метод удаления карточки со страницы
  _deleteCard() {
    this._element.closest('.cards__item').remove(); //удаляем блок карточки
  };

  //метод, открываюзий попап с изображением
  _showImage() {
    openPopup(popupOpenImage) //открываем попап с изображением
      popupImageName.textContent = this._name; //приравниваем текстовые содержания
      popupImageLink.src = this._link; //приравниваем ссылки на изображения
      popupImageLink.alt = this._name; //заполняем альт названием карточки
  };

  //обработчик слушателей
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLike()); //добавляем на кнопку лайк слушатель
    this._deleteButton.addEventListener('click', () => this._deleteCard());//добавили слушатель для удаления карточки
    this._cardImage.addEventListener('click', () => this._showImage()); //добавляем слушатель на изображение для открытия попапа с изображением
  };

  //метод созданиия новой карточки
  generateCard() {
    this._element = this._getTemplate(); //сохраняем разметку

    this._likeButton = this._element.querySelector('.cards__button'); //нашли кнопку лайка
    this._deleteButton = this._element.querySelector('.cards__delete'); //нашли кнопку удалить

    this._cardImage = this._element.querySelector('.cards__image'); //находим элемент изображения
    this._cardSubtitle = this._element.querySelector('.cards__subtitle'); //находим элемент описания изображения

    this._setEventListeners(); //вызываем обработчик слушателей

    this._cardSubtitle.textContent = this._name;

    this._cardImage.src = this._link; //присваиваем значение ссылки на изображение новой карточки
    this._cardImage.alt = this._name; // добавили описание в атрибут alt, равное названию карточки

    return this._element;
  };

}
