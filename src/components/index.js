import {Card} from './Card.js'
import {FormValidator} from "./FormValidator.js";
import '../pages/index.css'
import PopupWithImage from "./PopupWithImage";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import {validationOptions, cardOptions, initialCards} from "../utils/constants.js"
import UserInfo from "./UserInfo";

const editingProfileButton = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('[data-popup-type="EDIT"]')
const editingProfilePopupForm = editProfilePopup.querySelector('.popup__form')
const inputName = editingProfilePopupForm.querySelector('.form__input_field_user-full-name')
const inputDescription = editingProfilePopupForm.querySelector('.form__input_field_user-description')
const addPhotoButton = document.querySelector('.profile__add-button')

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
const userProfile = new UserInfo(
    '.profile__full-name',
    '.profile__description')


const fillEditForm = ({name, description}) => {
    inputName.value = name
    inputDescription.value = description
}

const formImagePopup = new PopupWithForm('.popup_add-photo',
    formData => {
        createCard(formData)
        formImagePopup.close()
    })

formImagePopup.setEventListeners()



const formProfilePopup = new PopupWithForm('.popup_edit',
    (formData) => {
        userProfile.setUserInfo(formData)
        formProfilePopup.close()
    }
)

formProfilePopup.setEventListeners()


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

    const currentUserInfo = userProfile.getUserInfo()
    fillEditForm(currentUserInfo);
    formProfilePopup.open()
})

addPhotoButton.addEventListener('click', () => {
    formImagePopup.open()
})