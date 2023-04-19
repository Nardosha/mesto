import {Card} from '../components/Card.js'
import {FormValidator} from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import {
    validationOptions,
    cardOptions,
    initialCards,
    editingProfileButton,
    addPhotoButton,
    popupWithImageOptions,
    profileOptions,
    popupWithFormOptions,
    sectionOptions, popupWithConfirmationOptions, avatarButton
} from "../utils/constants.js"
import './index.css'
import PopupWithConfirmation from "../components/PopupWithConfirmation";

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

// CONFIRMATION
const confirmationPopup = new PopupWithConfirmation(
    popupWithConfirmationOptions.confirmationPopupSelector)

// PHOTO
const imagePopup = new PopupWithImage(
    popupWithImageOptions.imagePopupSelector
)

imagePopup.setEventListeners()

const getCard = ({name, link}) => {
    const card = new Card({name, link},
        cardOptions.templateSelector,
        () => {
            imagePopup.open({name, link})
        },
        () => {
            confirmationPopup._handleAction = card.handleDelete.bind(card)
            confirmationPopup.open();
        }
    )
    return card.generateCardElement();
}

const createCard = (formData) => {
    const cardElement = getCard(formData)
    imagesSection.addItem(cardElement)
}


const submitAvatarForm = (formData) => {
    userProfile.setAvatar(formData)
    avatarPopup.close()
}

// PROFILE
const userProfile = new UserInfo(
    profileOptions.profileNameSelector,
    profileOptions.profileDescriptionSelector,
    profileOptions.profileAvatarSelector
)

// FORMS
const openProfileFormPopup = () => {
    const formName = formProfilePopup.getFormName();
    validatedForms[formName].resetValidation();

    const currentUserInfo = userProfile.getUserInfo();
    formProfilePopup.setInputValues(currentUserInfo);

    formProfilePopup.open();
}

const submitImageForm = (formData) => {
    createCard(formData)
    formImagePopup.close();
}

const submitProfileForm = (formData) => {
    userProfile.setUserInfo(formData)
    formProfilePopup.close();
}

const formImagePopup = new PopupWithForm(
    popupWithFormOptions.formAddImagePopupSelector,
    submitImageForm
)

formImagePopup.setEventListeners()


const formProfilePopup = new PopupWithForm(
    popupWithFormOptions.formEditProfilePopupSelector,
    submitProfileForm
)

formProfilePopup.setEventListeners()

const avatarPopup = new PopupWithForm(
    popupWithFormOptions.formAvatarPopupSelector,
    submitAvatarForm
)

avatarPopup.setEventListeners()


// SECTION
const imagesSection = new Section({
        items: initialCards,
        renderer: (cardParams) => createCard(cardParams)
    },
    sectionOptions.imagesContainer
)

imagesSection.renderItems();

enableValidations(validationOptions)


// LISTENERS
editingProfileButton.addEventListener('click', openProfileFormPopup)

addPhotoButton.addEventListener('click', () => {
    const formName = formImagePopup.getFormName()
    validatedForms[formName].resetValidation()
    formImagePopup.open()
})

avatarButton.addEventListener('click', () => {
    avatarPopup.open()
})