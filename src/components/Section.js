export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }

    _clean() {
        this._container.innerHTML = '';
    }

    renderItems(items) {
        this._clean()

        items.forEach(itemParams => {
            this._renderer(itemParams)
        })
    }

    addItem(item) {
        this._container.append(item)
    }

    addNewItem(item) {
        this._container.prepend(item)
    }
}