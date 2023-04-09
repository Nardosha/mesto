import {Card} from './Card.js'
import {FormValidator} from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo";
import {
    validationOptions,
    cardOptions,
    initialCards,
    editingProfileButton,
    addPhotoButton,
    profileFormSelectors
} from "../utils/constants.js"
import '../pages/index.css'

// VALIDATION
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
    profileFormSelectors.inputName.value = name
    profileFormSelectors.inputDescription.value = description
}

// FORMS
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