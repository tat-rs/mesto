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

  /* //добавить карточку (POST)
  addNewCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data), //данные в формате строки
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject('Что-то пошло не так')
    })
  } */
  //удалить карточку (DELETE)
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
