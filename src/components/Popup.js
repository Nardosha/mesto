import { popupOptions } from "../utils/constants";

export default class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector)
        this._closeButton = this._element.querySelector(popupOptions.closeButtonSelector)
    }

    open() {
        this._element.classList.add(popupOptions.openedPopupClass);
    }

    close() {
        this._element.classList.remove(popupOptions.openedPopupClass);
        this._removeEventListeners();
    }

    _handleEscClose({code: pressedKey}) {
        if (pressedKey !== 'Escape') return

        const openedPopup = document.querySelector(popupOptions.openedPopupSelector);
        openedPopup && this.close();
    }

    _closeByClick({target: clickTarget}) {
        if (!clickTarget?.classList.contains(popupOptions.openedPopupClass)) return

        this.close();
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this));
        document.addEventListener('keyup', this._handleEscClose.bind(this));
        document.addEventListener('mousedown', this._closeByClick.bind(this));
    }

    _removeEventListeners() {
        document.removeEventListener('keyup', this._handleEscClose);
        document.removeEventListener('mousedown', this._closeByClick);
    }
}