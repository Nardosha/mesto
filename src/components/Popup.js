export default class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector)
        this._closeButton = this._element.querySelector('.popup__button-close')
    }

    open() {
        this._element.classList.add('popup_opened');
    }

    close() {
        this._element.classList.remove('popup_opened');
    }

    _handleEscClose({code: pressedKey}) {
        if (pressedKey !== 'Escape') return

        const openedPopup = document.querySelector('.popup_opened')
        openedPopup && this.close()
    }

    _closeByClick({target: clickTarget}) {
        if (!clickTarget?.classList.contains('popup_opened')) return

        this.close()
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this))
        document.addEventListener('keyup', this._handleEscClose.bind(this))
        document.addEventListener('mousedown', this._closeByClick.bind(this))
    }

    // _removeEventListeners() {
    //     this._closeButton.removeEventListener('click', this.close.bind(this))
    //     document.removeEventListener('keyup', this._handleEscClose.bind(this))
    //     document.removeEventListener('mousedown', this._closeByClick.bind(this))
    // }
}