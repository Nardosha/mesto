const profileName = document.querySelector('.profile__full-name')
const profileDescription = document.querySelector('.profile__description')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__button-close')
const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')
const inputName = popupForm.querySelector('.form__input_field_user-full-name')
const inputDescription = popupForm.querySelector('.form__input_field_user-description')

const openPopup = () => {
    popup.classList.add('popup_opened')

    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
}

const closePopup = () => {
    popup.classList.remove('popup_opened')
}

const submit = (e) => {
    e.preventDefault()

    profileName.textContent = inputName.value
    profileDescription.textContent = inputDescription.value
    closePopup()
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
popupForm.addEventListener('submit', submit)