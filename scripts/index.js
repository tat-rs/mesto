let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__edit');
let popupCloseBtn = popup.querySelector('.popup__close');
let pfofileContainer = document.querySelector('.profile__info');
let profileName = pfofileContainer.querySelector('.profile__name');
let profileDesc = pfofileContainer.querySelector('.profile__desc');
let formInfo = popup.querySelector('.form');
let formInfoName = formInfo.querySelector('.form__item_type_name');
let formInfoDesc = formInfo.querySelector('.form__item_type_desc');
let addButton = popup.querySelector('.form__button');

function popupToggle() {
  popup.classList.toggle('popup__opened');
}

popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);

formInfoName.value = profileName.textContent;
formInfoDesc.value = profileDesc.textContent;

function addInfo(evt) {
  evt.preventDefault()
  profileName.textContent = formInfoName.value;
  profileDesc.innerHTML = formInfoDesc.value;
}
formInfo.addEventListener('submit', addInfo);
addButton.addEventListener('click', popupToggle);
