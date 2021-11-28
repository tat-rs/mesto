export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteOnClick }, selector) {
    this.cardId = data._id; //id карточки
    this._name = data.name; //описание карточки
    this._link = data.link; //ссылка изображения
    this._arrayLikes = data.likes; //массив объекта лайк
    this._currentUserId = data.currentUserId; // id текущего пользователя
    this._cardOwnerId = data.owner._id; //id создателя карточки
    this._selector = selector;
    this._handleCardClick = handleCardClick; //функция по клику на изображение
    this._handlLikeClick = handleLikeClick; // функция постановки лайка
    this._handleDeleteOnClick = handleDeleteOnClick; //функция открытия попапа предупреждения удаления
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

  //метод обновления массива лайков
  setLikes(dataOfLikes) {
    this._arrayLikes = dataOfLikes; //записали новый массив
    this._toggleLike(); //обновили постановку лайка и их кол-во
  };

  //возвращаем булевое значение совпадает ли id пользователя с id в массиве лайков
  isLiked() {
    return this._arrayLikes.some(user => user._id === this._currentUserId)
  };

  //метод постановки и удаления лайка
  _toggleLike() {
    if(!this.isLiked()) {
      this._likeButton.classList.remove('cards__button_active'); //удаляем лайк, если до этого ставили
    } else {
      this._likeButton.classList.add('cards__button_active'); //окрашиваем лайк, если до этого не ставили
    }
    this._sumOfLikes.textContent = this._arrayLikes.length; //обновляем количество лайков
  };

  //добавляем иконку удаления созданным карточкам
  deleteIcon() {
    //если id создателя карточки равно текущему пользователю, то добавляем иконку удаления
    if(this._cardOwnerId === this._currentUserId) {
      this._deleteButton.classList.add('cards__delete_visible');
    }
  }

  //обработчик слушателей
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handlLikeClick(this)); //добавляем на кнопку лайк слушатель
    this._deleteButton.addEventListener('click', () => this._handleDeleteOnClick(this));//добавили слушатель для открытия попапа с предупреждением
    this._cardImage.addEventListener('click', () => this._handleCardClick()); //добавляем слушатель на изображение для открытия попапа с изображением
  };

  //метод созданиия новой карточки
  generateCard() {
    this.element = this._getTemplate(); //сохраняем разметку

    this._likeButton = this.element.querySelector('.cards__button'); //нашли кнопку лайка
    this._sumOfLikes = this.element.querySelector('.cards__sum-likes'); //кол-во лайков
    this._deleteButton = this.element.querySelector('.cards__delete'); //нашли кнопку удалить

    this._cardImage = this.element.querySelector('.cards__image'); //находим элемент изображения
    this._cardSubtitle = this.element.querySelector('.cards__subtitle'); //находим элемент описания изображения
    this.deleteIcon(); //добавляем иконку удаления карточкам
    this._setEventListeners(); //вызываем обработчик слушателей
    this._toggleLike(); //добавляем кол-во лайков карточкам

    this._cardSubtitle.textContent = this._name; //описание карточки
    this._cardImage.src = this._link; //присваиваем значение ссылки на изображение новой карточки
    this._cardImage.alt = this._name; // добавили описание в атрибут alt, равное названию карточки

    return this.element;
  };

}
