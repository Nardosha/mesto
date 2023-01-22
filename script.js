const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')
const buttonEdit = document.querySelector('.profile__edit-button')
const buttonClosePopup = document.querySelector('.form__button-close')

const ACTION_TYPES = {
    EDIT: 'EDIT',
    CLOSE: 'CLOSE'
}
const actionHandler = (e) => {
    console.log(e)
}

const openPopup = () => {
    popup.classList.add('popup_opened')
    popupForm.classList.add('popup_opened')
    setFormFields()
}

const closePopup = () => {
    popup.classList.remove('popup_opened')
    popupForm.classList.remove('popup_opened')
}

const getFormFields = (formFields) => {
    const formFieldsMap = new Map()

    formFields.forEach(field => {
        const fieldName = field.dataset.userField
        const fieldValue = field.value

        if (!formFieldsMap.has(fieldName)) {
            formFieldsMap.set(fieldName, fieldValue)
        }
    })

    return formFieldsMap
}

const getProfileValues = (formFieldsMap) => {
    const userProfile = document.querySelector('.profile__settings')

    Array.from(userProfile.children).forEach(child => {
        const fieldName = child.dataset.userField
        const profileFieldValue = child.textContent

        if (!formFieldsMap.get(fieldName)) {
            formFieldsMap.set(fieldName, profileFieldValue)
        }
    })

    return formFieldsMap
}

const setFormFields = () => {
    const formFields = popupForm.querySelectorAll('.form__input')

    const formFieldsMap = getFormFields(formFields)
    const filledFieldsFromProfile = getProfileValues(formFieldsMap)

    formFields.forEach(field => {
        const fieldName = field.dataset.userField
        if (filledFieldsFromProfile.has(fieldName)) {
            field.value = filledFieldsFromProfile.get(fieldName)
        }
    })
}

buttonEdit.addEventListener('click', openPopup)
buttonClosePopup.addEventListener('click', closePopup)

