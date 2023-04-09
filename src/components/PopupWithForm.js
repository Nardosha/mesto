import Popup from "./Popup.js";
import { popupWithFormOptions } from "../utils/constants";

export default class PopupWithForm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._form = this._popup.querySelector(popupWithFormOptions.formSelector)
        this._handlerSubmit = handleSubmit;
        this._inputList = null;
    }


    _getInputValues() {
        this._inputList = Array.from(this._popup.querySelectorAll(popupWithFormOptions.inputSelector))
        this._inputValues = {}


        this._inputList.forEach(input => {
            if (!this._inputValues?.[input.name]) {
                this._inputValues[input.name] = input.value
            }
        });

        return this._inputValues;
    }

    _submitForm(e) {
        e.preventDefault()
        const formData = this._getInputValues()
        this._handlerSubmit(formData)
    }


    setEventListeners() {
        this._form.addEventListener('submit', this._submitForm.bind(this))
        super.setEventListeners();
    }

    getFormName() {
        return this._form.getAttribute('name')
    }

    close() {
        this._form.reset();
        super.close();
    }
}