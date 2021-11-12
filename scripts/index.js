import Card from '../components/Card.js'; //импортируем класс карточки
import { initialCards } from '../utils/initial-cards.js' //импортируем первоначальный массив карточек

import FormValidator from '../components/FormValidator.js'; //импортируем класс валидации
import { validationConfig } from '../components/FormValidator.js'; //импортируем объект с общими настройками

import Section from '../components/Section.js';

import Popup from '../components/Popup.js';

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

//функция закрытия попапа по кнопке esc
/* function closePopupByEsc (evt) {
  //если событие esc, то попап закрывается
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
    }
}; */

/* //объявление функции закрытия попапа
function closePopup(modal) {
  modal.classList.remove('popup_opened') //удаляем класс модификатора popup_opened
  window.removeEventListener('keydown', closePopupByEsc); //удаляем обработчик закрытия
}; */

/* //объявление функции открытия попапа
export function openPopup(modal) {
  modal.classList.add('popup_opened'); //присваиваем класс модификатора popup_opened
  window.addEventListener('keydown', closePopupByEsc); //присваиваем обработчик закрытия
}; */

//объявление функции открытия попапа редактирования профиля
function openEditProfilePopup() {
  openedPopupEdit.open() //открываем попап с редактирвоанием профиля
  formInfoName.value = profileName.textContent; //сохраняем в поле ввода текст со страницы
  formInfoDesc.value = profileDesc.textContent; //сохраняем в поле ввода описание профиля со страницы
};

//функция открытия попапа добавления новой карточки
function openCreateCardPopup() {
  openedPopupAddCard.open(); //открываем попап
  formCardSubtitle.value = ''; //обнуляем текст
  formImageLink.value = ''; //обнуляем ссылку
};

//объявление функции сохранения новых данных в форме редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault(); //обнуляем действие по умолчанию
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  openedPopupEdit.close();
  /* closePopup(popupEditProfile); */
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
  /* closePopup(popupCreateCard); */

  evt.currentTarget.reset(); //обнуление значение полей ввода
}

//функция возвращающая новую карточку
function renderCard(item) {
  const card = new Card(item, '.cards-template');
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

const openedPopupAddCard = new Popup('.popup_type_new-card');//экземпляр класса попапа добавления новой карточки
openedPopupAddCard.setEventListeners();//вызываем слушатель закрытия попапа по клику и оверлею

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

/* //добавление попапам обработчика закрытия по оверлею и кнопке крестик
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    } if(evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}); */

formInfo.addEventListener('submit', submitEditProfileForm);//сохранение внесенных данных по клику
formCard.addEventListener('submit', createNewCard); // создание новой карточки
