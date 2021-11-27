export default class Card {
  constructor({ data, handleCardClick, handleLikeClick }, selector) {
    /* console.log(data) */
    this.cardId = data._id; //айди карточки
    this._name = data.name;
    this._link = data.link;
    this._arrayLikes = data.likes; //массив объекта лайк
    this._currentUserId = data.currentUserId; // айди пользователя
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handlLikeClick = handleLikeClick;
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

  isLiked() {
    return this._arrayLikes.some(user => user._id === this._currentUserId)
  }

  setLikes(dataLikes) {
    this._arrayLikes = dataLikes;
    this._updateLike()
  }

  _updateLike() {
    if(!this.isLiked()) {
      this._likeButton.classList.remove('cards__button_active');
    } else {
      this._likeButton.classList.add('cards__button_active');
    }
  }

  //метод удаления карточки со страницы
  _deleteCard() {
    this._element.closest('.cards__item').remove(); //удаляем блок карточки
  };

  //обработчик слушателей
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handlLikeClick()); //добавляем на кнопку лайк слушатель
    this._deleteButton.addEventListener('click', () => this._deleteCard());//добавили слушатель для удаления карточки
    this._cardImage.addEventListener('click', () => this._handleCardClick()); //добавляем слушатель на изображение для открытия попапа с изображением
  };

  //метод созданиия новой карточки
  generateCard() {
    this._element = this._getTemplate(); //сохраняем разметку

    this._likeButton = this._element.querySelector('.cards__button'); //нашли кнопку лайка
    this._deleteButton = this._element.querySelector('.cards__delete'); //нашли кнопку удалить

    this._cardImage = this._element.querySelector('.cards__image'); //находим элемент изображения
    this._cardSubtitle = this._element.querySelector('.cards__subtitle'); //находим элемент описания изображения

    this._setEventListeners(); //вызываем обработчик слушателей
    this._updateLike();

    this._cardSubtitle.textContent = this._name;

    this._cardImage.src = this._link; //присваиваем значение ссылки на изображение новой карточки
    this._cardImage.alt = this._name; // добавили описание в атрибут alt, равное названию карточки

    return this._element;
  };

}
