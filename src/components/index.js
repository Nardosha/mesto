import {Card} from './Card.js'
import Popup from './Popup.js'
import {FormValidator} from "./FormValidator.js";
import '../pages/index.css'
import PopupWithImage from "./PopupWithImage";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import {validationOptions, cardOptions, initialCards} from "../utils/constants.js"

// PROFILE
const profileName = document.querySelector('.profile__full-name')
const profileDescription = document.querySelector('.profile__description')

// EDIT PROFILE POPUP
const editingProfileButton = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('[data-popup-type="EDIT"]')
const editingProfilePopupForm = editProfilePopup.querySelector('.popup__form')
const inputName = editingProfilePopupForm.querySelector('.form__input_field_user-full-name')
const inputDescription = editingProfilePopupForm.querySelector('.form__input_field_user-description')


// ADD PHOTO POPUP
const addPhotoButton = document.querySelector('.profile__add-button')
const addPhotoPopup = document.querySelector('[data-popup-type="ADD"]')
// const cardForm = addPhotoPopup.querySelector('.popup__form')
const inputPhotoDescription = document.querySelector('.form__input_field_image-description')
const inputPhotoSrc = document.querySelector('.form__input_field_image-src')

const validatedForms = {}

const enableValidations = (config) => {
    const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));

    formList.forEach(form => {
        const validatedForm = new FormValidator(validationOptions, form)

        const validatedFormName = validatedForm.formElement.getAttribute('name')

        if (!validatedForms[validatedFormName]) {
            validatedForms[validatedFormName] = validatedForm
        }


        validatedForm.enableValidation()
    })
}

// PHOTO
const imagePopup = new PopupWithImage('.popup-show-photo')

imagePopup.setEventListeners()

const createCard = ({name, link}) => {
    const card = new Card({
            name,
            link,
        },
        cardOptions.templateSelector,
        ({target}) => {
            imagePopup.open({name, link})
        }
    )
    const cardElement = card.generateCardElement()
    imagesSection.addItem(cardElement)
}


// PROFILE
const fillEditForm = () => {
    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
}

const editPopup = new PopupWithForm({
    selector: '.popup_edit',
    handleSubmit: function (formData) {
        profileName.textContent = formData.userFullName
        profileDescription.textContent = formData.userDescription
        editPopup.close()
    }
})

editPopup.setEventListeners()


// SECTION
const imagesSection = new Section(
    {
        items: initialCards,
        renderer: (cardParams) => createCard(cardParams)
    },
    '.content-photos__list'
)

imagesSection.renderItems();

enableValidations(validationOptions)


// LISTENERS
editingProfileButton.addEventListener('click', () => {
    fillEditForm();
    editPopup.open()
})

addPhotoButton.addEventListener('click', () => {
    const addImagePopup = new Popup('.popup_add-photo')
    addImagePopup.open()
})