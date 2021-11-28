function onResponce(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`)
}

export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  //получить список всех карточек в виде массива (GET)
  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onResponce)
  }

  //добавить карточку (POST)
  addNewCard(newCard) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.subtitle,
        link: newCard.link,
      })
    })
    .then(onResponce)
  }
  //удалить карточку (DELETE)
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onResponce)
  }


  //получить данные пользователя (GET)
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(onResponce)
  }
  //заменить данные пользователя (PATCH)
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


  //заменить аватар (PATCH)
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


  //“залайкать” карточку (PUT)
  setCardlike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(onResponce)
  }
  //удалить лайк карточки (DELETE)
  deleteCardlike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onResponce)
  }
}
