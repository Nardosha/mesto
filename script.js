const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')
const buttonEdit = document.querySelector('.profile__edit-button')
const buttonClosePopup = document.querySelector('.form__button-close')

const setEventListeners = () => {
    const actionButtons = document.querySelectorAll('[data-action]')
    console.log(actionButtons)

    actionButtons.forEach(btn => {
        btn.addEventListener('click', actionHandler)
    })
}

setEventListeners()

const ACTION_TYPES = {
    EDIT: 'EDIT',
    CLOSE: 'CLOSE',
}
const actionHandler = (e) => {
    const actionType = e.target.dataset.action
    if (actionType === ACTION_TYPES.EDIT) {
        openPopup()
        setFormFields()
    }
    if (actionType === ACTION_TYPES.EDIT) {
        closePopup()
    }
}

const openPopup = () => {
    console.log('OPEN')
    popup.classList.add('popup_opened')
    popupForm.classList.add('popup_opened')
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

        if (fieldName && !formFieldsMap.get(fieldName)) {
            formFieldsMap.set(fieldName, profileFieldValue)
        }
    })

    return formFieldsMap
}

const setFormFields = () => {
    const formFields = popupForm.querySelectorAll('.form__input')

    const formFieldsMap = getFormFields(formFields)
    const profileFields = getProfileValues(formFieldsMap)

    formFields.forEach(field => {
        const fieldName = field.dataset.userField
        if (profileFields.has(fieldName)) {
            field.value = profileFields.get(fieldName)
        }
    })

    console.log(profileFields);
}

buttonEdit.addEventListener('click', actionHandler)
buttonClosePopup.addEventListener('click', closePopup)

