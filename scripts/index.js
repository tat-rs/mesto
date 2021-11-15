import Card from '../components/Card.js'; //импортируем класс карточки
import { initialCards } from '../utils/initial-cards.js' //импортируем первоначальный массив карточек

import FormValidator from '../components/FormValidator.js'; //импортируем класс валидации
import { validationConfig } from '../components/FormValidator.js'; //импортируем объект с общими настройками

import Section from '../components/Section.js';

import Popup from '../components/Popup.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js'

const popups = document.querySelectorAll('.popup')//нашли массив попапов
//переменные попапа формы редактирования
const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupEditOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const profileName = document.querySelector('.profile__name'); //переменная имени пользователя
const profileDesc = document.querySelector('.profile__desc'); //переменная описания профиля
const formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
const formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
const formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

//переменные попапа добавления карточки
const cardContainerSelector = '.cards__list'
const cardListElement = document.querySelector('.cards__list'); //контейнер карточек в разметке
const popupCreateCard = document.querySelector('.popup_type_new-card'); //попап с добавлением новой картчоки
const popupAddCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки
const formCard = popupCreateCard.querySelector('.form'); //форма отправки данных новой карточки
const formCardSubtitle = formCard.querySelector('.form__item_type_image-subtitle'); //поле ввода названя карточки
const formImageLink = formCard.querySelector('.form__item_type_image-link'); //поле ввода ссылки на изображение карточки

const userInfo = new UserInfo('.profile__name', '.profile__desc')
userInfo.setUserInfo(profileName.textContent, profileDesc.textContent);

//объявление функции открытия попапа редактирования профиля
function openEditProfilePopup() {
  openedPopupEdit.open() //открываем попап с редактирвоанием профиля
  /* formInfoName.value = profileName.textContent; //сохраняем в поле ввода текст со страницы
  formInfoDesc.value = profileDesc.textContent; //сохраняем в поле ввода описание профиля со страницы */
  const getUserInfo = userInfo.getUserInfo();
  formInfoName.value = getUserInfo.name;
  formInfoDesc.value = getUserInfo.desc;
};

//объявление функции сохранения новых данных в форме редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault(); //обнуляем действие по умолчанию
  userInfo.setUserInfo(formInfoName.value, formInfoDesc.value);
  userInfo.updateUserInfo()
  openedPopupEdit.close();
};

//функция открытия попапа добавления новой карточки
function openCreateCardPopup() {
  openedPopupAddCard.open(); //открываем попап
  formCardSubtitle.value = ''; //обнуляем текст
  formImageLink.value = ''; //обнуляем ссылку
};

//добавление новой карточки на страницу из попапа добавить карточку
function createNewCard(evt) {
  evt.preventDefault();

//объявляем объект с ключами равными значениям в полях ввода
  const cardsElement = [{
    name: formCardSubtitle.value,
    link: formImageLink.value
  }];

  const newAddedCard = new Section({
    items: cardsElement,
    renderer: (item) => {
      const newElement = renderCard(item);
      newAddedCard.addItem(newElement);
    }
  }, cardContainerSelector)

  newAddedCard.renderItems();

  openedPopupAddCard.close();

  evt.currentTarget.reset(); //обнуление значение полей ввода
}

//функция возвращающая новую карточку
function renderCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open({data: item})
    }
  }, '.cards-template');
  const newCard = card.generateCard();
  return newCard
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = renderCard(item); //получили разметку карточки
    defaultCardList.addItem(newCard); //добавили в контейнер
  }
}, cardContainerSelector)

defaultCardList.renderItems(); //отрисовали первоначальные карточки на странице

const formValidatorAddCard = new FormValidator(validationConfig, '.form_type_add'); //создаем экземпляр валидации формы добавления карточки
formValidatorAddCard.enableValidation(); //вызываем валидацию формы

const formValidatorEditProfile = new FormValidator(validationConfig, '.form_type_edit'); //создаем экземпляр валидации формы редактирования профиля
formValidatorEditProfile.enableValidation() //валидириуем форму

const openedPopupEdit = new Popup('.popup_type_edit');//экземпляр класса попапа редактрования профиля
openedPopupEdit.setEventListeners(); //вызываем слушатель закрытия попапа по клику и оверлею


/* const openedPopupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (evt) => {
    console.log('nnn')
    submitEditProfileForm(evt)
  }
})*/;//экземпляр класса попапа редактрования профиля
/* openedPopupEdit.setEventListeners(); //вызываем слушатель закрытия попапа по клику и оверлею */


const openedPopupAddCard = new Popup('.popup_type_new-card');//экземпляр класса попапа добавления новой карточки
openedPopupAddCard.setEventListeners();//вызываем слушатель закрытия попапа по клику и оверлею

/* const openedPopupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (evt) => {
    console.log(evt)
    createNewCard()
  }
}); *///экземпляр класса попапа добавления новой карточки
/* openedPopupAddCard.setEventListeners();//вызываем слушатель закрытия попапа по клику и оверлею */

//открытие попапа по клику на кнопку редактирования профиля
popupEditOpenBtn.addEventListener('click', () => {
  openEditProfilePopup();
  formValidatorEditProfile.resetValidation(); //очищение ошибок
  /* openedPopupEdit.setEventListeners(); //вызываем слушатель закрытия попапа по клику и оверлею */
});

//открыть попап добавления новой карточки
popupAddCardOpenBtn.addEventListener('click', () => {
  openCreateCardPopup();
  formValidatorAddCard.resetValidation(); //очищение ошибок и дезактивация кнопки
  /* openedPopupAddCard.setEventListeners();//вызываем слушатель закрытия попапа по клику и оверлею */
});

formInfo.addEventListener('submit', submitEditProfileForm);//сохранение внесенных данных по клику
formCard.addEventListener('submit', createNewCard); // создание новой карточки

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();
