import Popup from "./Popup.js";
import { popupWithFormOptions } from "../utils/constants";

export default class PopupWithForm extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._form = this._element.querySelector(popupWithFormOptions.formSelector)
        this._handlerSubmit = handleSubmit;
        this._inputList = null;
    }


    _getInputValues() {
        this._inputList = Array.from(this._element.querySelectorAll(popupWithFormOptions.inputSelector))
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

    // _removeEventListeners() {
    //     this._form.removeEventListener('submit', this._submitForm.bind(this))
    //     super._removeEventListeners()
    // }

    close() {
        this._form.reset();
        super.close();
    }
}