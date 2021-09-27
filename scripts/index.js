const popupEditProfile = document.querySelector('.popup_type_edit'); //переменная попап с формой редактированя профиля
const popupOpenBtn = document.querySelector('.profile__edit'); //переменная кнопки редактирования профиля
const popupCloseBtn = popupEditProfile.querySelector('.popup__close'); //переменная кнопки закрытия редактирования профиля
let profileName = document.querySelector('.profile__name'); //переменная имени пользователя
let profileDesc = document.querySelector('.profile__desc'); //переменная описания профиля
let formInfo = popupEditProfile.querySelector('.form'); //переменная формы редактирования профиля
let formInfoName = formInfo.querySelector('.form__item_type_name'); //переменная значения имени профиля
let formInfoDesc = formInfo.querySelector('.form__item_type_desc'); //переменная значения описания профиля

//массив с первоначальными карточками при загрузке страницы
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
];

const cardTemplateElement = document.querySelector('.cards-template');//контейнер template карточек
const cardListElement = document.querySelector('.cards__list'); //контейнер карточек в разметке
const popupCreateCard = document.querySelector('.popup_type_new-card'); //попап с добавлением новой картчоки
const popupCardOpenBtn = document.querySelector('.profile__button'); //кнопка открытия попапа добавления карточки
const popupCardCloseBtn = popupCreateCard.querySelector('.popup__close'); //кнопка закрытия попапа добавления карточки
const formCard = popupCreateCard.querySelector('.form'); //форма отправки данных новой карточки
let formCardSubtitle = formCard.querySelector('.form__item_type_image-subtitle'); //поле ввода названя карточки
let formImageLink = formCard.querySelector('.form__item_type_image-link'); //поле ввода ссылки на изображение карточки
let likeBtn = cardTemplateElement.querySelector('.cards__button'); //кнопка лайк изображения
const popupOpenImage = document.querySelector('.popup_type_image'); //попап просмотра изображения
const popupOpenImageCloseBtn = popupOpenImage.querySelector('.popup__close'); //кнопка закрытия попапа просмотра изображения
let popupImageName = popupOpenImage.querySelector('.popup__subtitle'); //поле ввода описания картинки в попапе просмотра изображения
let popupImageLink = popupOpenImage.querySelector('.popup__image'); //поле ввода ссылки на картинку в попапе просмотра изображения

//объявление функции открытия попапа
function popupOpen(modal) {
  modal.classList.add('popup_opened')
}

//объявление функции закрытия попапа
function popupClose(modal) {
  modal.classList.remove('popup_opened')
}

//объявление функции открытия попапа редактирования профиля
function addStartInfo() {
  popupOpen(popupEditProfile)
  formInfoName.value = profileName.textContent;
  formInfoDesc.value = profileDesc.textContent;
}

//объявление функции сохранения новых данных в форме редактирования профиля
function addInfo(evt) {
  evt.preventDefault()
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  popupClose(popupEditProfile);
}

//создание новой карточки на странице
function createNewCard(event) {
  event.preventDefault();
//объявляем объект с ключами равными значениям в полях ввода
  let newCards = {
    name: formCardSubtitle.value,
    link: formCardLink.value
  };

  renderCards(newCards);

  popupClose(popupAddCard);

  event.currentTarget.reset();
}

//изменяем цвет лайка при нажатии
function addLike(event) {
  event.target.classList.toggle('cards__button_active');
}

//удаление карточки
function deleteCard(event) {
  const cardDeleted = event.currentTarget.closest('.cards__item'); //возвращаем ближайший родительский элемент - template

  cardDeleted.remove(); //удаляем блок карточки
}

//открытие попапа просмотра изображения
function showImage(event) {
  popupOpen(popupOpenImage)
  let mainElement = event.currentTarget.closest('.cards__item') //возвращаем ближайщий родительский элемент
  popupImageName.textContent = mainElement.querySelector('.cards__subtitle').textContent //приравниваем текстовые содержания
  popupImageLink.src = mainElement.querySelector('.cards__image').src //приравниваем ссылки на изображения
}

//объявление функции добавления карточек при загрузке страницы
function renderCards(element) {
  const newCardElement = cardTemplateElement.content.cloneNode(true);//клонируем массив
  //присваиваем значение описания новой карточки равной ключу name массива
  newCardElement.querySelector('.cards__subtitle').textContent = element.name;
  //присваиваем значение ссылки на изображение новой карточки равной ключу link массива
  newCardElement.querySelector('.cards__image').src = element.link;
  newCardElement.querySelector('.cards__button').addEventListener('click', addLike);//добавили слушатель на кнопку лайк
  newCardElement.querySelector('.cards__delete').addEventListener('click', deleteCard);//добавили слушатель для удаления карточки
  newCardElement.querySelector('.cards__image').addEventListener('click', showImage);
  cardListElement.prepend(newCardElement);// отображаем массив на странице
}

initialCards.map(renderCards) //отображаем новый массив карточек на странице

popupOpenBtn.addEventListener('click', addStartInfo);//открытие попапа по клику на кнопку редактирования профиля
popupCloseBtn.addEventListener('click', () => popupClose(popupEditProfile));//закрытие попапа по клику на кнопку редактирования профиля
formInfo.addEventListener('submit', addInfo);//сохранение внесенных данных по клику
popupCardOpenBtn.addEventListener('click', () => popupOpen(popupCreateCard)); //открыть попап добавления новой карточки
popupCardCloseBtn.addEventListener('click', () => popupClose(popupCreateCard));//закрыть попап добавления карточки
formCard.addEventListener('submit', createNewCard); // создание новой карточки
popupOpenImageCloseBtn.addEventListener('click', () => popupClose(popupOpenImage))//закрыть попап просмотра изображения
