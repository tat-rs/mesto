import { Card } from './Card.js';
import { initialCards } from './initial-cards.js'

const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const popupCloseBtn = popupEditProfile.querySelector('.popup__close'); //переменная кнопки закрытия редактирования профиля
const profileName = document.querySelector('.profile__name'); //переменная имени пользователя
const profileDesc = document.querySelector('.profile__desc'); //переменная описания профиля
const formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
const formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
const formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

const cardListElement = document.querySelector('.cards__list'); //контейнер карточек в разметке
const popupCreateCard = document.querySelector('.popup_type_new-card'); //попап с добавлением новой картчоки
const popupCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки
const popupCardCloseBtn = popupCreateCard.querySelector('.popup__close'); //кнопка закрытия попапа добавления карточки
const formCard = popupCreateCard.querySelector('.form'); //форма отправки данных новой карточки
const formCardSubtitle = formCard.querySelector('.form__item_type_image-subtitle'); //поле ввода названя карточки
const formImageLink = formCard.querySelector('.form__item_type_image-link'); //поле ввода ссылки на изображение карточки
const popupOpenImage = document.querySelector('.popup_type_image'); //попап просмотра изображения
const popupOpenImageCloseBtn = popupOpenImage.querySelector('.popup__close'); //кнопка закрытия попапа просмотра изображения


//функция закрытия попапа по кнопке esc
function closePopupByEsc (evt) {
  const popup = document.querySelector('.popup_opened')
  //если событие esc, то попап закрывается
  if (evt.key === 'Escape') {
      closePopup(popup)
    }
}

//функция закрытия попапа при нажатии на оверлей
function closePopupByOverlayClick(evt) {
  const popup = document.querySelector('.popup_opened')
  if (evt.target === evt.currentTarget) {
    closePopup(popup)
  }
}

/* //скрыть текст ошибки валидации
const hideError = (modal) => {
  const errorTextElements = Array.from(modal.querySelectorAll('.form__error')); //сохраняем массив из элементов ошибки
  //перебираем элементы массива и обнуляем текстовое содержание
  errorTextElements.forEach((errorElement) => {
    errorElement.textContent = '';
  })
}

//скрыть стили невалидного поля ввода формы
const hideErrorStyle = (modal) => {
  const inputElements = Array.from(modal.querySelectorAll('.form__item')); //сохраняем массив из полей ввода формы
  //перебираем элементы массива и удаляем стили невалидного поля ввода формы
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('form__item_state_invalid');
  })
} */

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
  openPopup(popupEditProfile);
  /* hideError(popupEditProfile);//удалить текст ошибки
  hideErrorStyle(popupEditProfile); //удалить стили ошибки */
  formInfoName.value = profileName.textContent; //в поле ввода текст со страницы
  formInfoDesc.value = profileDesc.textContent;
}

//функция открытия попапа добавления новой карточки
function openCreateCardPopup() {
  openPopup(popupCreateCard);
  /* hideError(popupCreateCard); //удалить текст ошибки
  hideErrorStyle(popupCreateCard); //удалить стили ошибки */
  formCardSubtitle.value = ''; //обнуляем текст
  formImageLink.value = ''; //обнуляем ссылку
}

//объявление функции сохранения новых данных в форме редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault()
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  closePopup(popupEditProfile);
}

//функция дезактивации кнопки сабмита
function disableSubmitButton(modal) {
  const submitButton = modal.querySelector('.form__button'); //нашли переменную с кнопкой
  submitButton.disabled = 'disabled';// дезактивировали кнопку
  submitButton.classList.add('form__button_disabled'); //добавили стиль неактивной кнопки
}

//добавление новой карточки на страницу из попапа добавить карточку
function createNewCard(event) {
  event.preventDefault();

//объявляем объект с ключами равными значениям в полях ввода
  const cardsElement = {
    name: formCardSubtitle.value,
    link: formImageLink.value
  };

  const newElement = renderCard(cardsElement); //отображение новой карточки

  cardListElement.prepend(newElement)

  closePopup(popupCreateCard);

  disableSubmitButton(popupCreateCard); //дезактивация кнопки после закрытия

  event.currentTarget.reset(); //обнуление значение полей ввода
}

//функция добавления карточек
function renderCard(item) {
  const card = new Card(item, '.cards-template');
  const newCard = card.createCard()
  return newCard
}

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
