import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selector, handleSubmit}) {
        super(selector);
        this._form = document.querySelector('.form')
        this._handlerSubmit = handleSubmit;
        this._inputList = null;
    }

    _getInputValues() {
        console.log('getInputValues')
        this._inputList = Array.from(this._element.querySelectorAll('.form__input'))
        this._inputValues = {}


        this._inputList.forEach(input => {
            if (!this._inputValues?.[input.name]) {
                this._inputValues[input.name] = input.value
            }
        });

        return this._inputValues;
    }


    _setEventListeners() {
        super._setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault()
            const formData = this._getInputValues()
            console.log('formData in cb', formData)
            this._handlerSubmit(formData)
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}