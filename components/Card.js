export default class Card {
  constructor({data, handleCardClick}, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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

  clickOnImage(item) {
    this._handleCardClick(item)
  }
  //обработчик слушателей
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLike()); //добавляем на кнопку лайк слушатель
    this._deleteButton.addEventListener('click', () => this._deleteCard());//добавили слушатель для удаления карточки
    this._cardImage.addEventListener('click', () => this.clickOnImage()); //добавляем слушатель на изображение для открытия попапа с изображением
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
