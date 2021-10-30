import { Card } from './Card.js'; //импортируем класс карточки
import { initialCards } from './initial-cards.js' //импортируем первоначальный массив карточек

import { FormValidator, validationConfig } from './FormValidator.js'; //импортируем класс валидации и объект с общими настройками
//переменные попапа формы редактирования
const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const popupCloseBtn = popupEditProfile.querySelector('.popup__close'); //переменная кнопки закрытия редактирования профиля
const profileName = document.querySelector('.profile__name'); //переменная имени пользователя
const profileDesc = document.querySelector('.profile__desc'); //переменная описания профиля
const formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
const formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
const formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

//переменные попапа добавления карточки
const cardListElement = document.querySelector('.cards__list'); //контейнер карточек в разметке
const popupCreateCard = document.querySelector('.popup_type_new-card'); //попап с добавлением новой картчоки
const popupCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки
const popupCardCloseBtn = popupCreateCard.querySelector('.popup__close'); //кнопка закрытия попапа добавления карточки
const formCard = popupCreateCard.querySelector('.form'); //форма отправки данных новой карточки
const formCardSubtitle = formCard.querySelector('.form__item_type_image-subtitle'); //поле ввода названя карточки
const formImageLink = formCard.querySelector('.form__item_type_image-link'); //поле ввода ссылки на изображение карточки

//переменные попапа просмотра изображения
const popupOpenImage = document.querySelector('.popup_type_image'); //попап просмотра изображения
const popupOpenImageCloseBtn = popupOpenImage.querySelector('.popup__close'); //кнопка закрытия попапа просмотра изображения

//функция закрытия попапа по кнопке esc
function closePopupByEsc (evt) {
  const popup = document.querySelector('.popup_opened')
  //если событие esc, то попап закрывается
  if (evt.key === 'Escape') {
      closePopup(popup)
    }
};

//функция закрытия попапа при нажатии на оверлей
function closePopupByOverlayClick(evt) {
  const popup = document.querySelector('.popup_opened')
  if (evt.target === evt.currentTarget) {
    closePopup(popup)
  }
};

//объявление функции открытия попапа
export function openPopup(modal) {
  modal.classList.add('popup_opened'); //присваиваем класс модификатора popup_opened
  window.addEventListener('keydown', closePopupByEsc); //присваиваем обработчик закрытия
  modal.addEventListener('mousedown', closePopupByOverlayClick); //присваиваем обработчик закрытия попапа по оверлею
};

//объявление функции закрытия попапа
function closePopup(modal) {
  modal.classList.remove('popup_opened') //удаляем класс модификатора popup_opened
  window.removeEventListener('keydown', closePopupByEsc); //удаляем обработчик закрытия
  modal.removeEventListener('mousedown', closePopupByOverlayClick); //удаляем обработчик закрытия попапа по оверлею
};

//объявление функции открытия попапа редактирования профиля
function openEditProfilePopup() {
  const formValidatorAddCard = new FormValidator(validationConfig, '.form_type_edit'); //создаем экземпляр валидпции формы
  formValidatorAddCard.enableValidation() //валидириуем форму
  openPopup(popupEditProfile); //открываем попап с редактирвоанием профиля
  formValidatorAddCard.hideError(); //очищаем ошибки после открытия
  formInfoName.value = profileName.textContent; //сохраняем в поле ввода текст со страницы
  formInfoDesc.value = profileDesc.textContent; //сохраняем в поле ввода описание профиля со страницы
};

//функция открытия попапа добавления новой карточки
function openCreateCardPopup() {
  const formValidatorEditProfile = new FormValidator(validationConfig, '.form_type_add'); //создаем экземпляр валидации формы
  formValidatorEditProfile.enableValidation(); //вызываем валидацию формы
  openPopup(popupCreateCard); //открываем попап
  formValidatorEditProfile.hideError(); //очищаем ошибки, которые были до закрытия попапа
  formCardSubtitle.value = ''; //обнуляем текст
  formImageLink.value = ''; //обнуляем ссылку
};

//объявление функции сохранения новых данных в форме редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault(); //обнуляем действие по умолчанию
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  closePopup(popupEditProfile);
};

//добавление новой карточки на страницу из попапа добавить карточку
function createNewCard(evt) {
  evt.preventDefault();

//объявляем объект с ключами равными значениям в полях ввода
  const cardsElement = {
    name: formCardSubtitle.value,
    link: formImageLink.value
  };

  const newElement = renderCard(cardsElement); //отображение новой карточки
  cardListElement.prepend(newElement);
  closePopup(popupCreateCard);

  evt.currentTarget.reset(); //обнуление значение полей ввода
}

//функция возвращающая новую карточку
function renderCard(item) {
  const card = new Card(item, '.cards-template');
  const newCard = card.generateCard();
  return newCard
};

//отображаем массив карточек при загрузке на страницу
initialCards.forEach((item) => {
  const element = renderCard(item);
  cardListElement.prepend(element);
});

popupOpenBtn.addEventListener('click', openEditProfilePopup);//открытие попапа по клику на кнопку редактирования профиля
popupCloseBtn.addEventListener('click', () => closePopup(popupEditProfile));//закрытие попапа по клику на кнопку редактирования профиля
formInfo.addEventListener('submit', submitEditProfileForm);//сохранение внесенных данных по клику
popupCardOpenBtn.addEventListener('click', openCreateCardPopup); //открыть попап добавления новой карточки
popupCardCloseBtn.addEventListener('click', () => closePopup(popupCreateCard));//закрыть попап добавления карточки
formCard.addEventListener('submit', createNewCard); // создание новой карточки
popupOpenImageCloseBtn.addEventListener('click', () => closePopup(popupOpenImage))//закрыть попап просмотра изображения
