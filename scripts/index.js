const ACTION_TYPES = {
    EDIT: 'EDIT',
    CLOSE: 'CLOSE',
}

const setEventListeners = () => {
    const actionButtons = document.querySelectorAll('[data-action]')

    actionButtons.forEach(btn => {
        btn.addEventListener('click', actionHandler)
    })

    const editButton = document.querySelector('.profile__edit-button')
    editButton.addEventListener('click', actionHandler)
}

const actionHandler = (e) => {
    const closestActionButton = e.target.closest('[data-action]')
    const actionType = closestActionButton.dataset.action

    const page = document.querySelector('.root')
    const popup = document.querySelector('.popup')
    const popupForm = document.querySelector('.popup__form')


    if (actionType === ACTION_TYPES.EDIT) {
        openPopup(popup, popupForm, page)
        setFormFields(popupForm)
    }
    if (actionType === ACTION_TYPES.CLOSE) {
        closePopup(popup, popupForm, page)
    }
}

const openPopup = (popup, popupForm, page) => {
    popup.classList.add('popup_opened')
    popupForm.classList.add('popup_opened')
    page.style.overflow = 'hidden'
}

const closePopup = (popup, popupForm, page) => {
    popup.classList.remove('popup_opened')
    popupForm.classList.remove('popup_opened')
    page.style.overflow = 'auto'
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
