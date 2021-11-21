//класс с отрисовкой элементов на странице
export default class Section {
  constructor({items, renderer}, elementSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(elementSelector);
  }

  //отрисовка элементов
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item)
    });
  };

  //добавление DOM-элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  };
}
