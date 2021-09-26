const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const popupCloseBtn = popupEditProfile.querySelector('.popup__close'); //переменная кнопки закрытия редактирования профиля
let profileName = document.querySelector('.profile__name'); //переменная имени пользователя
let profileDesc = document.querySelector('.profile__desc'); //переменная описания профиля
let formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
let formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
let formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; //массив с первоначальными карточками при загрузке страницы

const cardsListElement = document.querySelector('.cards__list'); //переменная контейнера массива с карточками
const cardsTemplateElement = document.querySelector('.cards-template'); //находим тег template, где будут новые карточки

const popupAddCards = document.querySelector('.popup_type_new-card'); //попап добавления новой карточки
const popupOpenBtnCard = document.querySelector('.profile__button'); //кнопка открытия формы добавления карточки
const popupCloseBtnCard = popupAddCards.querySelector('.popup__close')
let formCard = popupAddCards.querySelector('.form_type_new-card') //форма добавления новой карточки
let formSubtitle = popupAddCards.querySelector('.form__item_type_image-subtitle'); //поле ввода описания картинки
let formImage = popupAddCards.querySelector('.form__item_type_image-link') //поле ввода ссылки на изображение

//объявление функции открытия попапа
function popupOpen(modal) {
  modal.classList.add('popup_opened')
  if (modal === popupEditProfile) {
    formInfoName.value = profileName.textContent;
    formInfoDesc.value = profileDesc.textContent;
  }
}

//объявление функции закрытия попапа
function popupClose(modal) {
  modal.classList.remove('popup_opened');
}

//объявление функции сохранения новых данных в форме редактирования профиля
function addInfo(evt) {
  evt.preventDefault()
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  popupClose(popupEditProfile);
}

//объявление функции добавления карточек при загрузке страницы
function renderCards(item) {
  const newCards = cardsTemplateElement.content.cloneNode(true); //клонируем содержимое тега template
  newCards.querySelector('.cards__image').src = item.link;// наполняем содержимым
  newCards.querySelector('.cards__subtitle').textContent = item.name;
  cardsListElement.append(newCards);// отображаем на странице
}

initialCards.map(renderCards) //отображаем новый массив карточек на странице

/* function addCard(evt) {
  evt.preventDefault()
  function createCard({link: placeLinkInput.value, name: placeNameInput.value}) {

  }
  const addCardsElement = cardsTemplateElement.content.cloneNode(true); //клонируем содержимое тега template
  addCardsElement.querySelector('.cards__image').src = item.link;// наполняем содержимым
  addCardsElement.querySelector('.cards__subtitle').textContent = item.name;
  cardsListElement.append(addCardsElement);// отображаем на странице
  popupClose(popupAddCards);
} */

popupOpenBtn.addEventListener('click', () => popupOpen(popupEditProfile));//открытие попапа по клику на кнопку редактирования профиля
popupCloseBtn.addEventListener('click', () => popupClose(popupEditProfile));//закрытие попапа по клику на кнопку редактирования профиля
formInfo.addEventListener('submit', addInfo);//сохранение внесенных данных по клику
popupOpenBtnCard.addEventListener('click', () => popupOpen(popupAddCards));
popupCloseBtnCard.addEventListener('click', () => popupClose(popupAddCards));
formCard.addEventListener('submit', addCard);
