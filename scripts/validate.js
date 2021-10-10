//показать ошибку
const showError = (errorElement, inputElement) => {
  errorElement.textContent = inputElement.validationMessage; //присвоили стандратный текст ошибки
  inputElement.classList.add('form__item_state_invalid'); //добавили класс со стилем ошибки
}

//скрыть ошибку
const hideError = (errorElement, inputElement) => {
  errorElement.textContent = ''; //удалили стандратный текст ошибки
  inputElement.classList.remove('form__item_state_invalid'); //удалили класс со стилем ошибки
}

//функция проверки валидности поля ввода формы
const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid; //переменная с невалидным полем
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)//находим элемент с ошибкой в момент ввода в поле

  if (isInputNotValid) {
    showError(errorElement, inputElement);
  } else {
    hideError(errorElement, inputElement);
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
const toggleButtonState = (inputList, button) => {
  // Если есть хотя бы одно поле ввода невалидно
  if (hasInvalidInput(inputList)) {
    button.classList.add('form__button_disabled'); //добавляем класс со стилем неактивной кнопки
    button.disabled = 'disabled';
  } else {
    button.classList.remove('form__button_disabled'); // иначе убираем класс со стилем неактивной кнопки
    button.disabled = false;
  }
};

//устанавливаем обработчик полям ввода формы
const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item')); //находм все поля вводы формы в передаваемой форме и создаем массив
  const submitButton = formElement.querySelector('.form__button')
  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });

  //отменяем действия по умолчанию
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
};

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('.form')); //находим все формы в документе
  //добавим обработчика для каждого элемента формы
  forms.forEach(formElement => {
    setEventListener(formElement); //добавляем обработчик всем полям ввода формы
  });
};

enableValidation()
