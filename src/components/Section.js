export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }

    _clean() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this._clean()

        this._items.forEach(itemParams => {
            this._renderer(itemParams)
        })
    }

    addItem(item) {
        this._container.prepend(item)
    }
}