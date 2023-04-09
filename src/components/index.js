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
    profileFormSelectors,
    popupWithImageOptions,
    profileOptions,
    popupWithFormOptions,
    sectionOptions
} from "../utils/constants.js"
import '../pages/index.css'

// VALIDATION
const validatedForms = {}

const enableValidations = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach(form => {
        const validatedForm = new FormValidator(config, form)

        const validatedFormName = validatedForm.formElement.getAttribute('name')

        if (!validatedForms[validatedFormName]) {
            validatedForms[validatedFormName] = validatedForm
        }


        validatedForm.enableValidation()
    })
}

// PHOTO
const imagePopup = new PopupWithImage(popupWithImageOptions.imagePopupSelector)

imagePopup.setEventListeners()

const createCard = ({name, link}) => {
    const card = new Card({
            name,
            link,
        },
        cardOptions.templateSelector,
        () => {
            imagePopup.open({name, link})
        }
    )
    const cardElement = card.generateCardElement()
    imagesSection.addItem(cardElement)
}


// PROFILE
const userProfile = new UserInfo(
    profileOptions.profileNameSelector,
    profileOptions.profileDescriptionSelector
)


const fillEditForm = ({name, description}) => {
    profileFormSelectors.inputName.value = name
    profileFormSelectors.inputDescription.value = description
}

// FORMS
const formImagePopup = new PopupWithForm(popupWithFormOptions.formAddImagePopupSelector,
    formData => {
        createCard(formData)
        formImagePopup.close()
    })

formImagePopup.setEventListeners()


const formProfilePopup = new PopupWithForm(popupWithFormOptions.formEditProfilePopupSelector,
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
    sectionOptions.imagesContainer
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