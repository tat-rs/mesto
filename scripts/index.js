let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__edit');
let popupCloseBtn = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__desc');
let formInfo = popup.querySelector('.form');
let formInfoName = formInfo.querySelector('.form__item_type_name');
let formInfoDesc = formInfo.querySelector('.form__item_type_desc');

function popupOPen() {
  formInfoName.value = profileName.textContent;
  formInfoDesc.value = profileDesc.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function addInfo(evt) {
  evt.preventDefault()
  profileName.textContent = formInfoName.value;
  profileDesc.textContent = formInfoDesc.value;
  popupClose();
}

popupOpenBtn.addEventListener('click', popupOPen);
popupCloseBtn.addEventListener('click', popupClose);
formInfo.addEventListener('submit', addInfo);
