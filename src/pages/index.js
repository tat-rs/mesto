import './index.css';

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
} from '../utils/constants.js';

import Card from '../components/Card.js'; //импортируем класс карточки

import FormValidator from '../components/FormValidator.js'; //импортируем класс валидации
import { validationConfig } from '../components/FormValidator.js'; //импортируем объект с общими настройками

import Section from '../components/Section.js'; //импортируем класс с отрисовкой элементов на странице

import PopupWithImage from '../components/PopupWithImage.js'; //импортируем класс попапа с изображением

import PopupWithForm from '../components/PopupWithForm.js'; //импортируем попап с формой

import UserInfo from '../components/UserInfo.js'; //импортируем класс с управлением отображ. инф-ии о профиле

import Api from '../components/Api.js';

import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

//переменные попапа редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupEditOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
const formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
const formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

//переменные попапа добавления карточки
const popupAddCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки

const popupEditAvatar = document.querySelector('.profile__image-container')

//создаем экземпляр класса отоброжаения инф-ии о пользователи
const userInfo = new UserInfo(selectorProfileName, selectorProfileDesc, selectorAvatarProfile);

//экземпляр первоначальных карточек на странице
const cardList = new Section({
  renderer: (data) => {
    const newCard = renderCard(data); //получили разметку карточки
    cardList.addItem(newCard); //добавили в контейнер
  }
}, cardContainerSelector);

let userId = null;
//Api
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
  userId = dataUser._id;
  userInfo.setUserInfo(dataUser); //добавляем новые значения
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
    openedPopupEdit.close();
  }
});
openedPopupEdit.setEventListeners(); //вызываем слушатель закрытия попапа по клику и оверлею

//создаем экземпляр класса добавления карточки
const openedPopupAddCard = new PopupWithForm({
  popupSelector: selectorPopupAddCard,
  handleFormSubmit: (data) => {
    handleAddCardFormSubmit(data); //функция добавления карточки при сабмите
    openedPopupAddCard.close();
  }
});
openedPopupAddCard.setEventListeners();

const openedPopupEditAvatar = new PopupWithForm({
  popupSelector: selectorPopupEditAvatar,
  handleFormSubmit: (data) => {
    api.editUserAvatar(data)//добавляем новые значения
    .then((newAvatar) => {
      userInfo.setUserInfo(newAvatar)
    })
    .catch(err => console.log(err))
    .finally(() => openedPopupEditAvatar.renderLoading(false))
    openedPopupEditAvatar.close();
  }
})

openedPopupEditAvatar.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
  handleFormSubmit: (card) => {
    api.deleteCard(card.cardId)
    .then(() => {
      card.element.remove();
    })
    .catch(err => console.log(err));

    popupWithConfirmation.close()
  }
})

popupWithConfirmation.setEventListeners()

function renderCard(data) {
  const card = new Card({
    //расширяем объект новым полем - id пользователя
    data: {...data, currentUserId: userId},
    handleCardClick: () => {
      popupWithImage.open(data)
    },
    handleLikeClick: (card) => {
      if(card.isLiked()) {
        api.deleteCardlike(card.cardId)
        .then(dataCard => card.setLikes(dataCard.likes))
        .catch(err => console.log(err))
      } else {
        api.setCardlike(card.cardId)
        .then(dataCard => card.setLikes(dataCard.likes))
        .catch(err => console.log(err))
      }
    },
    handleDeleteOnClick: (card) => {
      //у каждой кнопки свой колбэк, который отправляет запрос на сервер
      popupWithConfirmation.open()
      /* console.log(card, card.cardId) */
      popupWithConfirmation.setActionSubmit(card) //получили айди текущей карточки
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
  api.editUserInfo(data)//добавляем новые значения
  .then((newUserInfo) => {
  userInfo.setUserInfo(newUserInfo)
  })
  .catch(err => console.log(err))
  .finally(() => openedPopupEdit.renderLoading(false))
};

//добавление новой карточки на страницу из попапа добавить карточку
function createNewCard(data) {
  //сохраняем карточку
  const card = renderCard(data);
  return card

};

//функция добавления новой карточки при сабмите
function handleAddCardFormSubmit(data) {
  /* cardList.addItem(createNewCard(data)); //добавили карточку в контейнер */
  api.addNewCard(data)
  .then(newCard => {
    cardList.addItem(createNewCard(newCard)) //добавили карточку в контейнер
  })
  .catch(err => console.log(err))
  .finally(() => openedPopupAddCard.renderLoading(false))
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

popupEditAvatar.addEventListener('click', () => {
  openedPopupEditAvatar.open();
  formValidatorEditAvatar.resetValidation()
})
