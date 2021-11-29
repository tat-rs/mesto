import './index.css'; //импорт стилей

import {
  cardContainerSelector,
  selectorProfileName,
  selectorProfileDesc,
  selectorCardTemplate,
  selectorPopupProfileEdit,
  selectorPopupAddCard,
  selectorPopupWithImage,
  selectorFormAddCard,
  selectorFormEdit,
  selectorAvatarProfile,
  selectorFormEditAvatar,
  selectorPopupEditAvatar,
  selectorPopupDelete,
} from '../utils/constants.js'; //импорт селекторов

import Card from '../components/Card.js'; //импортируем класс карточки

import FormValidator from '../components/FormValidator.js'; //импортируем класс валидации
import { validationConfig } from '../components/FormValidator.js'; //импортируем объект с общими настройками

import Section from '../components/Section.js'; //импортируем класс с отрисовкой элементов на странице

import PopupWithImage from '../components/PopupWithImage.js'; //импортируем класс попапа с изображением

import PopupWithForm from '../components/PopupWithForm.js'; //импортируем попап с формой

import UserInfo from '../components/UserInfo.js'; //импортируем класс с управлением отображ. инф-ии о профиле

import Api from '../components/Api.js'; //импортируем класс с запросами к серверу

import PopupWithConfirmation from '../components/PopupWithConfirmation.js'; //импортируем класс предупреждения

//переменные попапа редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupEditOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
const formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
const formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

//переменные попапа добавления карточки
const popupAddCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки

const btnAvatarEdit = document.querySelector('.profile__image-edit'); //кнопка редактирования фото профиля

//создаем экземпляр класса отоброжаения инф-ии о пользователи
const userInfo = new UserInfo(selectorProfileName, selectorProfileDesc, selectorAvatarProfile);

//экземпляр первоначальных карточек на странице
const cardList = new Section({
  renderer: (data) => {
    const newCard = renderCard(data); //получили разметку карточки
    cardList.addItem(newCard); //добавили в контейнер
  }
}, cardContainerSelector);

let userId = null; //idd пользователя

//экземпляр класса Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: '3ace1836-34ae-4def-81c7-968efe5e4e17',
    "content-type": "application/json",
  }
})

//добавляем первоначальную информацию на страницу
Promise.all([api.getAllCards(), api.getUserInfo()])
.then(([dataCards, dataUser]) => {
  userId = dataUser._id; //присваиваем id пользователя
  userInfo.setUserInfo(dataUser); //добавляем новые значения профиля
  cardList.renderItems(dataCards);//отрисовали карточки на странице
})
.catch(err => console.log(err))

//создаем экземпляр класса попапа с изображением
const popupWithImage = new PopupWithImage(selectorPopupWithImage);
popupWithImage.setEventListeners();

//создаем экземпляр класса попапа редактирования профиля
const openedPopupEdit = new PopupWithForm({
  popupSelector: selectorPopupProfileEdit,
  handleFormSubmit: (data) => {
    submitEditProfileForm(data); //функция сохранения данных при сабмите
  }
});
openedPopupEdit.setEventListeners(); //вызываем слушатель закрытия попапа по клику и оверлею

//создаем экземпляр класса добавления карточки
const openedPopupAddCard = new PopupWithForm({
  popupSelector: selectorPopupAddCard,
  handleFormSubmit: (data) => {
    handleAddCardFormSubmit(data); //функция добавления карточки при сабмите
  }
});
openedPopupAddCard.setEventListeners(); //вызываем слушатель закрытия попапа по клику и оверлею

//создаем экземпляр попапа редактирования фото профиля
const openedPopupEditAvatar = new PopupWithForm({
  popupSelector: selectorPopupEditAvatar,
  handleFormSubmit: (data) => {
    api.editUserAvatar(data)
    .then((newAvatar) => {
      userInfo.setUserInfo(newAvatar) //добавляем новое фото пользователя
      openedPopupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => openedPopupEditAvatar.renderLoading(false)) //возвращаем первоначальный текст кнопки
  }
})
openedPopupEditAvatar.setEventListeners(); //вызываем слушатель закрытия попапа по клику и оверлею

//создаем экземпляр класса с подтверждением об удалении
const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: selectorPopupDelete,
  handleFormSubmit: (card) => {
    api.deleteCard(card.cardId) //запрос на удаление карточки
    .then(() => {
      card.element.remove();//удаляем карточку
      popupWithConfirmation.close();
    })
    .catch(err => console.log(err));
  }
})
popupWithConfirmation.setEventListeners()//вызываем слушатель закрытия попапа по клику и оверлею

//функция созданя карточки
function renderCard(data) {
  const card = new Card({
    //расширяем объект новым полем - id пользователя
    data: {...data, currentUserId: userId},
    //функция открытия попапа с изображением
    handleCardClick: () => {
      popupWithImage.open(data)
    },
    //функция постановки лайка
    handleLikeClick: (card) => {
      //если лайк был, то делаем запрос на удаление
      if(card.isLiked()) {
        api.deleteCardlike(card.cardId)
        .then(dataCard => card.setLikes(dataCard.likes))
        .catch(err => console.log(err))
      } else {
        //если лайка не было, то делаем запрос на добавление
        api.setCardlike(card.cardId)
        .then(dataCard => card.setLikes(dataCard.likes))
        .catch(err => console.log(err))
      }
    },
    //функция открытия попапа с подтверждением удаления
    handleDeleteOnClick: (card) => {
      popupWithConfirmation.open()
      popupWithConfirmation.setDataSubmit(card) //получили айди текущей карточки
    }
  }, selectorCardTemplate);

  const newCard = card.generateCard();
  return newCard
};

//создаем экземпляр валидации формы добавления карточки
const formValidatorAddCard = new FormValidator(validationConfig, selectorFormAddCard);
formValidatorAddCard.enableValidation(); //вызываем валидацию формы

//создаем экземпляр валидации формы редактирования профиля
const formValidatorEditProfile = new FormValidator(validationConfig, selectorFormEdit);
formValidatorEditProfile.enableValidation(); //валидириуем форму

//создаем экземпляр валидации формы редактирования фото профиля
const formValidatorEditAvatar = new FormValidator(validationConfig, selectorFormEditAvatar);
formValidatorEditAvatar.enableValidation(); //валидириуем форму

//объявление функции открытия попапа редактирования профиля
function openEditProfilePopup() {
  openedPopupEdit.open() //открываем попап с редактирвоанием профиля
  const getUserInfo = userInfo.getUserInfo(); //сохраняем объект с новыми данными
  formInfoName.value = getUserInfo.name; //присваиваем новое значение имени профиля
  formInfoDesc.value = getUserInfo.about; //присваиваем новое значение описания профиля
};

//объявление функции сохранения новых данных в форме редактирования профиля
function submitEditProfileForm(data) {
  api.editUserInfo(data)//добавляем новые значения имени и описания
  .then((newUserInfo) => {
  userInfo.setUserInfo(newUserInfo);
  openedPopupEdit.close();
  })
  .catch(err => console.log(err))
  .finally(() => openedPopupEdit.renderLoading(false)) //возвращаем первоначальный текст кнопки
};

//добавление новой карточки на страницу из попапа добавить карточку
function createNewCard(data) {
  //сохраняем карточку
  const card = renderCard(data);
  return card
};

//функция добавления новой карточки при сабмите
function handleAddCardFormSubmit(data) {
  api.addNewCard(data)//запрос к серверу
  .then(newCard => {
    cardList.addItem(createNewCard(newCard)) //добавили карточку в контейнер
    openedPopupAddCard.close();
  })
  .catch(err => console.log(err))
  .finally(() => openedPopupAddCard.renderLoading(false)) //возвращаем первоначальный текст кнопки
}

//открытие попапа по клику на кнопку редактирования профиля
popupEditOpenBtn.addEventListener('click', () => {
  openEditProfilePopup();
  formValidatorEditProfile.resetValidation(); //очищение ошибок
});

//открыть попап добавления новой карточки
popupAddCardOpenBtn.addEventListener('click', () => {
  openedPopupAddCard.open(); //открываем попап
  formValidatorAddCard.resetValidation(); //очищение ошибок и дезактивация кнопки
});

//открыть попап редактирования профиля
btnAvatarEdit.addEventListener('click', () => {
  openedPopupEditAvatar.open();
  formValidatorEditAvatar.resetValidation()
})
