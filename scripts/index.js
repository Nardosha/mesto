const ACTION_TYPES = {
    EDIT: 'EDIT',
    CLOSE: 'CLOSE',
    SUBMIT: 'SUBMIT',
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
    const popupForm = document.querySelector('.popup__form')


    if (actionType === ACTION_TYPES.EDIT) {
        togglePopup(popupForm)
        setFormFields(popupForm)
        return
    }

    if (actionType === ACTION_TYPES.CLOSE) {
        togglePopup(popupForm)
        return;
    }

    if (actionType === ACTION_TYPES.SUBMIT) {
        submit(e, popupForm)
    }
}

const togglePopup = (popupForm) => {
    const page = document.querySelector('.root')
    const popup = document.querySelector('.popup')

    popup.classList.toggle('popup_opened')
    popupForm.classList.toggle('popup_opened')
    page.classList.toggle('page_disabled')
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

const submit = (e, popupForm) => {
    e.preventDefault()

    const formData = new FormData(popupForm)

    setProfileValues(formData)
    togglePopup(popupForm)
}


const setProfileValues = (formData) => {
    const userProfile = document.querySelector('.profile__settings')

    Array.from(userProfile.children).forEach(child => {
        const fieldName = child.dataset.userField
        const formField = formData.get(fieldName)

        if (fieldName && formData.get(fieldName)) {
            child.textContent = formField
        }
    })
}

setEventListeners()

