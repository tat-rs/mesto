export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //получить список всех карточек в виде массива (GET)
  getAllCards() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject('Что-то пошло не так, ошибка')
    })

  }

  //добавить карточку (POST)
  //удалить карточку (DELETE)
  //получить данные пользователя (GET)
  //заменить данные пользователя (PATCH)
  //заменить аватар (PATCH)
  //“залайкать” карточку (PUT)
  //удалить лайк карточки (DELETE)
}
