//класс с отрисовкой элементов на странице
export default class Section {
  constructor({renderer}, elementSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(elementSelector);
  }

  //отрисовка элементов
  renderItems(data) {
    data.forEach(item => {
      this._renderer(item)
    });
  };

  //добавление DOM-элемента в контейнер
  addItem(element, place = 'after') {
    if(place === 'before') {
      this._container.prepend(element);
    }

    if(place === 'after') {
      this._container.append(element);
    }
  };
}
