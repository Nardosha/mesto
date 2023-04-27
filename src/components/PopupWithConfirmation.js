import Popup from "./Popup";
import {popupWithConfirmationOptions} from "../utils/constants";

export default class PopupWithConfirmation extends Popup {
    constructor(selector) {
        super(selector);
        this._confirmButtton = this._popup.querySelector(popupWithConfirmationOptions.confirmationButtonSelector)
        this._confirmAction = this._confirm.bind(this)
        this._handleAction = null
    }

    open() {
        this._setEventListeners();
        super.open();
    }

    close() {
        this._removeEventListeners();
        super.close();
    }

    _setEventListeners() {
        this._confirmButtton.addEventListener('click', this._confirmAction);
        super.setEventListeners();
    }

    _removeEventListeners() {
        this._confirmButtton.removeEventListener('click', this._confirmAction);
    }

    _confirm(e) {
        e.preventDefault()
        this._handleAction();
        this.close();
    }

}