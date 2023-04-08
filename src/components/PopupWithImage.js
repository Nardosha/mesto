import Popup from "./Popup.js";
//
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._imagePopup = this._element.querySelector('.popup-show-photo__photo')
        this._imageDescription = this._element.querySelector('.popup-show-photo__description')
    }

    open({name, link}) {
        this._imagePopup.src = link
        this._imagePopup.alt = name
        this._imageDescription.textContent = name
        super.open()
    }
}