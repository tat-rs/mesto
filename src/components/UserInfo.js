//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor(nameProfileSelector, descProfileSelector, userAvatarSelector) {
    this._nameProfile = document.querySelector(nameProfileSelector); //элемент имени пользователя
    this._descProfile = document.querySelector(descProfileSelector); //элемент информации о себе
    this._userAvatar = document.querySelector(userAvatarSelector); //элемент информации о себе
  }

  //метод, который возвращает объект с данными пользователя
  getUserInfo() {
    const newData = {
      name: this._nameProfile.textContent, //имя профиля
      about: this._descProfile.textContent,//описание профиля
      avatar: this._userAvatar.src,//ссылка на фото пользователя
    }
    return newData
  };

  //метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._nameProfile.textContent = data.name;
    this._descProfile.textContent = data.about;
    this._userAvatar.src = data.avatar;
  };
}
