export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }

    _generateElement() {

    }

    renderItems() {
     this._items.forEach(itemParams => {
         this._renderer(itemParams)
     })
    }

    addItem(item) {
        this._container.append(item)
    }
}