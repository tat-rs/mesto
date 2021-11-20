//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor(nameProfileSelector, descProfileSelector) {
    this._nameProfile = document.querySelector(nameProfileSelector); //элемент имени пользователя
    this._descProfile = document.querySelector(descProfileSelector); //элемент информации о себе
  }

  //метод, который возвращает объект с данными пользователя
  getUserInfo() {
    const newData = {
      name: this._name,
      desc: this._desc,
    }
    return newData
  };

  //метод обновления данных
  updateUserInfo() {
    this._nameProfile.textContent = this._name;
    this._descProfile.textContent = this._desc;
  };

  //метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(newName, newDesc) {
    this._name = newName;
    this._desc = newDesc;
  };
}
