const ACTION_TYPES = {
    EDIT: 'EDIT',
    CLOSE: 'CLOSE',
}

const setEventListeners = () => {
    const actionButtons = document.querySelectorAll('[data-action]')

    actionButtons.forEach(btn => {
        btn.addEventListener('click', actionHandler)
    })
}

const actionHandler = (e) => {
    const actionType = e.target.dataset.action

    const popup = document.querySelector('.popup')
    const popupForm = document.querySelector('.popup__form')


    if (actionType === ACTION_TYPES.EDIT) {
        openPopup(popup, popupForm)
        setFormFields(popupForm)
    }
    if (actionType === ACTION_TYPES.CLOSE) {
        closePopup(popup, popupForm)
    }
}

const openPopup = (popup, popupForm) => {
    popup.classList.add('popup_opened')
    popupForm.classList.add('popup_opened')
}

const closePopup = (popup, popupForm) => {
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

const setFormFields = (popupForm) => {
    const formFields = popupForm.querySelectorAll('.form__input')

    const formFieldsMap = getFormFields(formFields)
    const profileFields = getProfileValues(formFieldsMap)

    formFields.forEach(field => {
        const fieldName = field.dataset.userField
        if (profileFields.has(fieldName)) {
            field.value = profileFields.get(fieldName)
        }
    })
}

setEventListeners()
