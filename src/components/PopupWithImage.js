import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({selector, targetCard}) {
        super(selector)
        this._targetCard = targetCard.closest('.photo-item')
        this._targetSrc = this._targetCard.querySelector('.photo-item__img').src
        this._targetDescription = this._targetCard.querySelector('.photo-item__description').textContent

        this._card = this._element.querySelector('.popup-show-photo__photo')
        this._description = this._element.querySelector('.popup-show-photo__description')

    }

    open() {
        this._card.src = this._targetSrc
        this._card.alt = this._targetDescription
        this._description.textContent = this._targetDescription
        super.open()
    }


}