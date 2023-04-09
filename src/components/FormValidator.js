export class FormValidator {
    constructor(options, formElement) {
        this.formElement = formElement
        this._options = options
        this._buttonSubmit = this.formElement.querySelector(this._options.formButtonSubmitSelector)
        this._inputList = Array.from(this.formElement.querySelectorAll(this._options.formInputSelector));
        this.__errorContainerList = this._setErrorElements();
        this._isValidInputs = true
    }

    enableValidation() {
        this._toggleButtonState()
        this._setEventListeners()
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach(input => {
            this._hideError(input)
        })
    }

    _setErrorElements() {
        return this._inputList.reduce((acc, input) => {
            const errorContainer = this.formElement.querySelector(`#${input.id}-error`)

            if (!acc[input.name]) {
                acc[input.name] = errorContainer
            }
            return acc
        }, {})
    }

    _setEventListeners() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._toggleInputState(input)
                this._toggleButtonState()
            })
        })
    }

    _toggleInputState(input) {
        const isValidInput = input.validity.valid
        this._setInputState(input, isValidInput)
    }

    _showError(input) {
        input.classList.add(this._options.formInputTypeErrorClass)
        this.__errorContainerList[input.name].classList.add(this._options.formInputErrorActiveClass)
        this.__errorContainerList[input.name].textContent = input.validationMessage
    }

    _hideError(input) {
        input.classList.remove(this._options.formInputTypeErrorClass)

        this.__errorContainerList[input.name].classList.remove(this._options.formInputErrorActiveClass)
        this.__errorContainerList[input.name].textContent = ''
    }

    _setInputState(input, isValidInput) {
        if (!isValidInput) {
            this._showError(input)
        } else {
            this._hideError(input)
        }
    }

    _validateInputs() {
        return this._inputList.some(input => !input.validity.valid)
    }

    _disableButtonSubmit() {
        this._buttonSubmit.setAttribute('disabled', 'disabled')
        this._buttonSubmit.classList.add(this._options.formButtonSubmitTypeDisabledClass)
    }

    _enableButtonSubmit() {
        this._buttonSubmit.removeAttribute('disabled')
        this._buttonSubmit.classList.remove(this._options.formButtonSubmitTypeDisabledClass)
    }

    _toggleButtonState() {
        this._isValidInputs = !this._validateInputs()

        if (!this._isValidInputs) {
            this._disableButtonSubmit()
        } else {
            this._enableButtonSubmit()
        }
    }

}