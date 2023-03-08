const showError = (input, inputMessage, {formInputTypeErrorClass, formInputErrorActiveClass}) => {
    input.classList.add(formInputTypeErrorClass)
    inputMessage.classList.add(formInputErrorActiveClass)
    inputMessage.textContent = input.validationMessage
}

const hideError = (input, inputMessage, {formInputTypeErrorClass, formInputErrorActiveClass}) => {
    input.classList.remove(formInputTypeErrorClass)
    inputMessage.classList.remove(formInputErrorActiveClass)
    inputMessage.textContent = ''
}


const isInvalid = (inputList) => {
    return inputList.some(input => !input.validity.valid)
}

const setInputState = (form, input, isValidInput, options) => {
    const inputMessage = form.querySelector(`.${input.id}-error`)

    if (!isValidInput) {
        showError(input, inputMessage, options)
    } else {
        hideError(input, inputMessage, options)
    }
}

const toggleInputState = (form, input, options) => {
    const isValidInput = input.validity.valid
    setInputState(form, input, isValidInput, options)
}

const disableButtonSubmit = (button, disabledButtonClass) => {
    button.setAttribute('disabled', true)
    button.classList.add(disabledButtonClass)
}

const enableButtonSubmit = (button, disabledButtonClass) => {
    button.setAttribute('disabled', false)
    button.classList.remove(disabledButtonClass)
}

const toggleButtonState = (inputList, button, disabledButtonClass) => {
    if (isInvalid(inputList)) {
        disableButtonSubmit(button, disabledButtonClass)
    } else {
        enableButtonSubmit(button, disabledButtonClass)
    }
}
const setEventListeners = (form, options) => {
    const inputList = Array.from(form.querySelectorAll(options.formInputSelector))
    const buttonSubmit = form.querySelector(options.formButtonSubmitSelector)

    toggleButtonState(inputList, buttonSubmit, options.formButtonSubmitTypeDisabledClass)

    inputList.forEach(input => {
        input.addEventListener('input', (e) => {
            toggleInputState(form, input, options)
            toggleButtonState(inputList, buttonSubmit, options.formButtonSubmitTypeDisabledClass)
        })
    })
}

const enableValidation = (options) => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));

    formList.forEach(form => {
        setEventListeners(form, options)
    })
}