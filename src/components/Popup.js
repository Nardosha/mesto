import { popupOptions } from "../utils/constants";

export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closeButton = this._popup.querySelector(popupOptions.closeButtonSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeByClick = this._closeByClick.bind(this);
    }

    open() {
        this._popup.classList.add(popupOptions.openedPopupClass);

        this._popup.addEventListener('mousedown', this._closeByClick);
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(popupOptions.openedPopupClass);
        this._removeEventListeners();
    }

    _handleEscClose({code: pressedKey}) {
        if (pressedKey !== 'Escape') return
        this.close()
    }

    _closeByClick({target: clickTarget}) {
        if (!clickTarget?.classList.contains(popupOptions.openedPopupClass)) return

        this.close();
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this));
    }

    _removeEventListeners() {
        this._popup.removeEventListener('mousedown', this._closeByClick);
        document.removeEventListener('keyup', this._handleEscClose);
    }
}