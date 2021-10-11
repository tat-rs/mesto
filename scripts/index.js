import { initialCards } from "./initial-cards.js"; // импорт массива с первоначальными карточками страницы

const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const popupCloseBtn = popupEditProfile.querySelector('.popup__close'); //переменная кнопки закрытия редактирования профиля
const profileName = document.querySelector('.profile__name'); //переменная имени пользователя
const profileDesc = document.querySelector('.profile__desc'); //переменная описания профиля
const formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
const formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
const formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

const cardTemplateElement = document.querySelector('.cards-template');//контейнер template карточек
const cardListElement = document.querySelector('.cards__list'); //контейнер карточек в разметке
const popupCreateCard = document.querySelector('.popup_type_new-card'); //попап с добавлением новой картчоки
const popupCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки
const popupCardCloseBtn = popupCreateCard.querySelector('.popup__close'); //кнопка закрытия попапа добавления карточки
const formCard = popupCreateCard.querySelector('.form'); //форма отправки данных новой карточки
const formCardSubtitle = formCard.querySelector('.form__item_type_image-subtitle'); //поле ввода названя карточки
const formImageLink = formCard.querySelector('.form__item_type_image-link'); //поле ввода ссылки на изображение карточки
const likeBtn = cardTemplateElement.querySelector('.cards__button'); //кнопка лайк изображения
const popupOpenImage = document.querySelector('.popup_type_image'); //попап просмотра изображения
const popupOpenImageCloseBtn = popupOpenImage.querySelector('.popup__close'); //кнопка закрытия попапа просмотра изображения
const popupImageName = popupOpenImage.querySelector('.popup__subtitle'); //поле ввода описания картинки в попапе просмотра изображения
const popupImageLink = popupOpenImage.querySelector('.popup__image'); //поле ввода ссылки на картинку в попапе просмотра изображения

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

//объявление функции открытия попапа
function openPopup(modal) {
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
  openPopup(popupEditProfile)
  formInfoName.value = profileName.textContent;
  formInfoDesc.value = profileDesc.textContent;
}

//объявление функции сохранения новых данных в форме редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault()
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  closePopup(popupEditProfile);
}

//изменяем цвет лайка при нажатии
function toggleLike(event) {
  event.target.classList.toggle('cards__button_active'); //добавляем или убираем класс cards__button_active у элемента
}

//удаление карточки
function deleteCard(event) {
  const cardDeleted = event.currentTarget.closest('.cards__item'); //возвращаем ближайший родительский элемент - template
  cardDeleted.remove(); //удаляем блок карточки
}

//открытие попапа просмотра изображения
function showImage(event) {
  openPopup(popupOpenImage)
  const mainElement = event.currentTarget.closest('.cards__item') //возвращаем ближайщий родительский элемент
  popupImageName.textContent = mainElement.querySelector('.cards__subtitle').textContent //приравниваем текстовые содержания
  popupImageLink.src = mainElement.querySelector('.cards__image').src //приравниваем ссылки на изображения
}

//функция создания новой карточки
function createCard(element) {
  const newCardElement = cardTemplateElement.content.cloneNode(true);//клонируем массив
  //присваиваем значение описания новой карточки равной ключу name массива
  newCardElement.querySelector('.cards__subtitle').textContent = element.name;
  //присваиваем значение ссылки на изображение новой карточки равной ключу link массива
  newCardElement.querySelector('.cards__image').src = element.link;
  newCardElement.querySelector('.cards__button').addEventListener('click', toggleLike);//добавили слушатель на кнопку лайк
  newCardElement.querySelector('.cards__delete').addEventListener('click', deleteCard);//добавили слушатель для удаления карточки
  newCardElement.querySelector('.cards__image').addEventListener('click', showImage);
  return newCardElement
}

//функция добавления карточек
function renderCard(element) {
  const newElement = createCard(element)
  cardListElement.prepend(newElement);
}

//добавление новой карточки на страницу из попапа добавить карточку
function createNewCard(event) {
  event.preventDefault();
//объявляем объект с ключами равными значениям в полях ввода
  const newCards = {
    name: formCardSubtitle.value,
    link: formImageLink.value
  };

  renderCard(newCards);

  closePopup(popupCreateCard);

  event.currentTarget.reset();
}

initialCards.map(renderCard) //отображаем новый массив карточек на странице

popupOpenBtn.addEventListener('click', openEditProfilePopup);//открытие попапа по клику на кнопку редактирования профиля
popupCloseBtn.addEventListener('click', () => closePopup(popupEditProfile));//закрытие попапа по клику на кнопку редактирования профиля
formInfo.addEventListener('submit', submitEditProfileForm);//сохранение внесенных данных по клику
popupCardOpenBtn.addEventListener('click', () => openPopup(popupCreateCard)); //открыть попап добавления новой карточки
popupCardCloseBtn.addEventListener('click', () => closePopup(popupCreateCard));//закрыть попап добавления карточки
formCard.addEventListener('submit', createNewCard); // создание новой карточки
popupOpenImageCloseBtn.addEventListener('click', () => closePopup(popupOpenImage))//закрыть попап просмотра изображения
