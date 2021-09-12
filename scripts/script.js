let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__link');
let popupCloseBtn = popup.querySelector('.popup__close');
let pfofileContainer = document.querySelector('.profile__info');
let profileName = pfofileContainer.querySelector('.profile__title');
let profileDesc = pfofileContainer.querySelector('.profile__text');
let formInfo = popup.querySelector('.form');
let formInfoName = formInfo.querySelector('.form__item_type_name');
let formInfoDesc = formInfo.querySelector('.form__item_type_desc');

function popupToggle() {
  popup.classList.toggle('popup__opened')
}

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle();
  }
}

popup.addEventListener ('click', clickOverlay);

popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);

formInfoName.value = profileName.textContent;
formInfoDesc.value = profileDesc.textContent;

function addInfo(evt) {
  evt.preventDefault()
  profileName.innerHTML = `<h1 class="profile__title">${formInfoName.value}</h1>`;
  profileDesc.innerHTML = `<p class="profile__text">${formInfoDesc.value}</p>`;
}
formInfo.addEventListener('submit', addInfo);
