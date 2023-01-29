const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__button-close')
const submitButton = document.querySelector('.form__button-submit')
const popupContainer = document.querySelector('.popup__container')
const popupForm = document.querySelector('.popup__form')

const getProfileValues = () => {
    const userProfile = document.querySelector('.profile__settings')
    const formFieldsMap = new Map()

    Array.from(userProfile.children).forEach(child => {
        const fieldName = child.dataset.userField
        const profileFieldValue = child.textContent

        if (fieldName) {
            formFieldsMap.set(fieldName, profileFieldValue)
        }
    })

    return formFieldsMap
}

const togglePopup = () => {
    const page = document.querySelector('.root')
    const popup = document.querySelector('.popup')

    popup.classList.toggle('popup_opened')
    popupContainer.classList.toggle('popup_opened')
    page.classList.toggle('scroll-lock')
}

const setFormFields = () => {
    const formFields = popupForm.querySelectorAll('.form__input')
    const profileFields = getProfileValues()

    formFields.forEach(field => {
        const fieldName = field.dataset.userField
        if (profileFields.has(fieldName)) {
            field.value = profileFields.get(fieldName)
        }
    })
}

const editButtonHandler = () => {
    togglePopup()
    setFormFields()
}

const submit = (e) => {
    e.preventDefault()

    const userProfile = document.querySelector('.profile__settings')
    const formData = new FormData(popupForm)

    Array.from(userProfile.children).forEach(child => {
        const fieldName = child.dataset.userField
        const formField = formData.get(fieldName)

        if (fieldName && formData.get(fieldName)) {
            child.textContent = formField.toString()
        }
    })

    togglePopup()
}

editButton.addEventListener('click', editButtonHandler)
closeButton.addEventListener('click', togglePopup)
submitButton.addEventListener('click', submit)
