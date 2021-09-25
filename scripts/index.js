let popupEditProfile = document.querySelector('.popup_type_edit');
let popupOpenBtn = document.querySelector('.profile__edit');
let popupCloseBtn = popupEditProfile.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__desc');
let formInfo = popupEditProfile.querySelector('.form');
let formInfoName = formInfo.querySelector('.form__item_type_name');
let formInfoDesc = formInfo.querySelector('.form__item_type_desc');
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

const cardsListElement = document.querySelector('.cards__list'); //контейнер для массива с карточками
const cardsTemplateElement = document.querySelector('.cards-template'); //находим тег template, где будут новые карточки

function popupOpen() {
  formInfoName.value = profileName.textContent;
  formInfoDesc.value = profileDesc.textContent;
  popupEditProfile.classList.add('popup_opened');
}

function popupClose() {
  popupEditProfile.classList.remove('popup_opened');
}

function addInfo(evt) {
  evt.preventDefault()
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  popupClose();
}

function renderCards(item) {
  //клонируем содержимое тега template
  const newCards = cardsTemplateElement.content.cloneNode(true);
  // наполняем содержимым
  newCards.querySelector('.cards__image').src = item.link;
  newCards.querySelector('.cards__subtitle').textContent = item.name;
  // отображаем на странице
  cardsListElement.append(newCards);
}

initialCards.map(renderCards) //отображаем новый массив карточек на странице

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
formInfo.addEventListener('submit', addInfo);
