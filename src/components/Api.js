//обрабатываем результат запроса к серверу
function onResponce(res) {
  if (res.ok) {
    return res.json(); //возвращаем резульат, если нет ошибок
  }
  return Promise.reject(`Ошибка: ${res.status}`); //возвращаем статус ошибки
};

//класс запроса к серверу
export default class Api {
  constructor({url, headers}) {
    this._url = url; //ссылка сервера
    this._headers = headers; //заголовок
  }

  //метод, получающий список всех карточек с сервера
  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onResponce)
  }

  //метод добавления новой карточки на страницу
  addNewCard(newCard) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.subtitle, //новое описание
        link: newCard.link, //новая ссыока
      })
    })
    .then(onResponce)
  }

  //метод удаления карточки со страницы
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onResponce)
  }

  //получаем данные пользователя
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onResponce)
  }

  //метод редактирования данных пользователя
  editUserInfo(info) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      })
    })
    .then(onResponce)
  }

  //метод редактирования фото профиля
  editUserAvatar(userAvatar) {
    return fetch(`${this._url}users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar.avatar,
      })
    })
    .then(onResponce)
  }

  //метод постановки лайка
  setCardlike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(onResponce)
  }

  //метод удаления лайка
  deleteCardlike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onResponce)
  }
}
