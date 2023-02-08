const profileName = document.querySelector('.profile__full-name')
const profileDescription = document.querySelector('.profile__description')
const editButton = document.querySelector('.profile__edit-button')
const addImageButton = document.querySelector('.profile__add-button')
const closeButtons = document.querySelectorAll('.popup__button-close')
const editProfilePopup = document.querySelector('.popup_edit-profile')
const addImagePopup = document.querySelector('.popup_add-image')
const popupForm = document.querySelector('.popup__form')
const inputName = popupForm.querySelector('.form__input_field_user-full-name')
const inputDescription = popupForm.querySelector('.form__input_field_user-description')

const openEditProfilePopup = () => {
    editProfilePopup.classList.add('popup_opened')

    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
}

const openAddImagePopup = () => {
    addImagePopup.classList.add('popup_opened')
}


const closePopup = () => {
    editProfilePopup.classList.remove('popup_opened')
    addImagePopup.classList.remove('popup_opened')
}

const submit = (e) => {
    e.preventDefault()

    profileName.textContent = inputName.value
    profileDescription.textContent = inputDescription.value
    closePopup()
}

editButton.addEventListener('click', openEditProfilePopup)
addImageButton.addEventListener('click', openAddImagePopup)
closeButtons.forEach(btn => {
    btn.addEventListener('click', closePopup)
})
popupForm.addEventListener('submit', submit)
