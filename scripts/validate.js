const showError = (input, errorTextContainer, {formInputTypeErrorClass, formInputErrorActiveClass}) => {
    input.classList.add(formInputTypeErrorClass)
    errorTextContainer.classList.add(formInputErrorActiveClass)
    errorTextContainer.textContent = input.validationMessage
}

const hideError = (input, errorTextContainer, {formInputTypeErrorClass, formInputErrorActiveClass}) => {
    input.classList.remove(formInputTypeErrorClass)
    errorTextContainer.classList.remove(formInputErrorActiveClass)
    errorTextContainer.textContent = ''
}


const isInvalid = (inputList) => {
    return inputList.some(input => !input.validity.valid)
}

const setInputState = (form, input, isValidInput, options) => {
    const errorTextContainer = form.querySelector(`#${input.id}-error`)

    if (!isValidInput) {
        showError(input, errorTextContainer, options)
    } else {
        hideError(input, errorTextContainer, options)
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
    button.removeAttribute('disabled')
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
        input.addEventListener('input', () => {
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