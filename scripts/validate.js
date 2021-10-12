//передаваемый объект настроек всех нужных классов и селекторов элементов
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_state_invalid',
};

//показать ошибку
const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage; //присвоили стандратный текст ошибки
  inputElement.classList.add(config.inputErrorClass); //добавили класс со стилем ошибки
}

//скрыть ошибку
const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = ''; //удалили стандратный текст ошибки
  inputElement.classList.remove(config.inputErrorClass); //удалили класс со стилем ошибки
};

//функция проверки валидности поля ввода формы
const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid; //переменная с невалидным полем
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)//находим элемент с ошибкой в момент ввода в поле
//определяем показывать или скрывать ошибку в зависимости от валидности
  if (isInputNotValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
}

//проверка валидности воля ввода
const hasInvalidInput = (inputList) => {
  //перебор каждого элемента массива на валидность
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; //возвращает true, если поле невалидно
  });
};

//включение и отключение кнопки в зависимости от валидности формы
const toggleButtonState = (inputList, button, config) => {
  // Если есть хотя бы одно поле ввода невалидно
  if (hasInvalidInput(inputList, config)) {
    button.classList.add(config.inactiveButtonClass); //добавляем класс со стилем неактивной кнопки
    button.disabled = 'disabled';
  } else {
    button.classList.remove(config.inactiveButtonClass); // иначе убираем класс со стилем неактивной кнопки
    button.disabled = false;
  }
};

//устанавливаем обработчик полям ввода формы
const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); //находм все поля вводы формы в передаваемой форме и создаем массив
  const submitButton = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });

  //отменяем действия по умолчанию
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
};

//функция валидации всех форм на странице
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector)); //находим все формы в документе
  //добавим обработчика для каждого элемента формы
  forms.forEach(formElement => {
    setEventListener(formElement, config); //добавляем обработчик всем полям ввода формы
  });
};

enableValidation(validationConfig) //включение валидации форм на странице
