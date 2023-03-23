export class FormValidator {
    constructor(options, formElement) {
        this.formElement = formElement
        this._options = options
        this._isValidInputs = true
    }

    _setFormElements() {
        this._inputList = Array.from(this.formElement.querySelectorAll(this._options.formInputSelector))
        this._buttonSubmit = this.formElement.querySelector(this._options.formButtonSubmitSelector)

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

    _showError(input, errorTextContainer) {
        input.classList.add(this._options.formInputTypeErrorClass)
        errorTextContainer.classList.add(this._options.formInputErrorActiveClass)
        errorTextContainer.textContent = input.validationMessage
    }

    _hideError(input, errorTextContainer) {
        input.classList.remove(this._options.formInputTypeErrorClass)
        errorTextContainer.classList.remove(this._options.formInputErrorActiveClass)
        errorTextContainer.textContent = ''
    }

    _setInputState(input, isValidInput) {
        const errorTextContainer = this.formElement.querySelector(`#${input.id}-error`)

        if (!isValidInput) {
            this._showError(input, errorTextContainer)
        } else {
            this._hideError(input, errorTextContainer)
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
        this._isValidInputs = this._validateInputs()

        if (this._isValidInputs) {
            this._disableButtonSubmit()
        } else {
            this._enableButtonSubmit()
        }
    }

    resetValidation() {
        this._toggleButtonState()
    }

    enableValidation() {
        this._setFormElements()
        this._toggleButtonState()
        this._setEventListeners()
    }
}