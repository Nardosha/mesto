import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector, targetCard) {
        super(selector)
        this._card = this._element.querySelector('.popup-show-photo__photo')
        this._description = this._element.querySelector('.popup-show-photo__description')
        this._target = targetCard
        this._targetSrc = targetCard.querySelector('.photo-item__img').src
        this._targetDescription = targetCard.querySelector('.photo-item__description').textContent

    }

    open() {
        this._card.src = this._targetSrc
        this._card.alt = this._targetDescription
        this._description = this._targetDescription
        super.open()
    }


}