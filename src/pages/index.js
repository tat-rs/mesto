import '../pages/index.css';

import {
  cardContainerSelector,
  selectorProfileName,
  selectorProfileDesc,
  selectorCardTemplate,
  selectorPopupProfileEdit,
  selectorPopupAddCard,
  selectorPopupWithImage,
  selectorFormAddCard,
  selectorFormEdit
} from '../utils/constants.js';

import Card from '../components/Card.js'; //импортируем класс карточки
import { initialCards } from '../utils/initial-cards.js'; //импортируем первоначальный массив карточек

import FormValidator from '../components/FormValidator.js'; //импортируем класс валидации
import { validationConfig } from '../components/FormValidator.js'; //импортируем объект с общими настройками

import Section from '../components/Section.js'; //импортируем класс с отрисовкой элементов на странице

import PopupWithImage from '../components/PopupWithImage.js'; //импортируем класс попапа с изображением

import PopupWithForm from '../components/PopupWithForm.js'; //импортируем попап с формой

import UserInfo from '../components/UserInfo.js'; //импортируем класс с управлением отображ. инф-ии о профиле

//переменные попапа редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupEditOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
const formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
const formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

//переменные попапа добавления карточки
const popupCreateCard = document.querySelector('.popup_type_new-card'); //попап с добавлением новой картчоки
const popupAddCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки
const formCard = popupCreateCard.querySelector('.form'); //форма отправки данных новой карточки

//создаем экземпляр класса отоброжаения инф-ии о пользователи
const userInfo = new UserInfo(selectorProfileName, selectorProfileDesc);

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
    createNewCard(data); //функция сохранения данных при сабмите карточки
    openedPopupAddCard.close();
  }
});
openedPopupAddCard.setEventListeners();

//создаем экземпляр валидации формы добавления карточки
const formValidatorAddCard = new FormValidator(validationConfig, selectorFormAddCard);
formValidatorAddCard.enableValidation(); //вызываем валидацию формы

//создаем экземпляр валидации формы редактирования профиля
const formValidatorEditProfile = new FormValidator(validationConfig, selectorFormEdit);
formValidatorEditProfile.enableValidation(); //валидириуем форму

//объявление функции открытия попапа редактирования профиля
function openEditProfilePopup() {
  openedPopupEdit.open() //открываем попап с редактирвоанием профиля
  const getUserInfo = userInfo.getUserInfo(); //сохраняем объект с новыми данными
  formInfoName.value = getUserInfo.name; //присваиваем новое значение имени профиля
  formInfoDesc.value = getUserInfo.desc; //присваиваем новое значение описания профиля
};

//объявление функции сохранения новых данных в форме редактирования профиля
function submitEditProfileForm(data) {
  userInfo.setUserInfo(data.name, data.description); //добавляем новые значения
};

//функция открытия попапа добавления новой карточки
function openCreateCardPopup() {
  openedPopupAddCard.open(); //открываем попап
};

//функция возвращающая новую карточку
function renderCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open({data: item})
    }
  }, selectorCardTemplate);
  const newCard = card.generateCard();
  return newCard
};

//добавление новой карточки на страницу из попапа добавить карточку
function createNewCard(data) {

  //объявляем объект с ключами равными значениям в полях ввода
  const cardsElement = [{
    name: data.subtitle,
    link: data.link,
  }];

  //создаем и добавляем разметку новой карточки на страницу
  const newAddedCard = section(cardsElement);
  newAddedCard.renderItems(); //отрисовываем элемент на странице
};

//возвращаем экземпляр разметки элемента
function section(element) {
  const newElement = new Section({
    items: element,
    renderer: (item) => {
      const newCard = renderCard(item); //получили разметку карточки
      newElement.addItem(newCard); //добавили в контейнер
    }
  }, cardContainerSelector);

  return newElement
}

//экземпляр первоначальных карточек на странице
const defaultCardList = section(initialCards);
defaultCardList.renderItems();//отрисовали первоначальные карточки на странице

//открытие попапа по клику на кнопку редактирования профиля
popupEditOpenBtn.addEventListener('click', () => {
  openEditProfilePopup();
  formValidatorEditProfile.resetValidation(); //очищение ошибок
});

//открыть попап добавления новой карточки
popupAddCardOpenBtn.addEventListener('click', () => {
  openCreateCardPopup();
  formValidatorAddCard.resetValidation(); //очищение ошибок и дезактивация кнопки
});
