import Popup from "./Popup.js";
import { popupWithImageOptions } from "../utils/constants";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._imagePopup = this._popup.querySelector(popupWithImageOptions.imageSelector)
        this._imageDescription = this._popup.querySelector(popupWithImageOptions.descriptionSelector)
    }

    open({name, link}) {
        this._imagePopup.src = link
        this._imagePopup.alt = name
        this._imageDescription.textContent = name
        super.open()
    }
}