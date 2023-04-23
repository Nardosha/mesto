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
    sectionOptions, popupWithConfirmationOptions, avatarButton, apiConfig
} from "../utils/constants.js"
import './index.css'
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/API";

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
// API
const api = new Api(apiConfig)

// CONFIRMATION
const confirmationPopup = new PopupWithConfirmation(
    popupWithConfirmationOptions.confirmationPopupSelector)

// PHOTO
const imagePopup = new PopupWithImage(
    popupWithImageOptions.imagePopupSelector
)

imagePopup.setEventListeners()

const deleteCard = (id) => {
    api.deleteCard(id)
        .then(res => {
            console.log('success', res?.message)
        }).catch(err => {
        console.log(err)
    })
}

const getCard = ({_id, name, link, likes}, isOwnCard) => {
    const card = new Card({_id, name, link, likes, isOwnCard},
        cardOptions.templateSelector,
        () => {
            imagePopup.open({name, link})
        },
        () => {
            confirmationPopup._handleAction = () => card.handleDelete();
            confirmationPopup.open();
        },
        (id) => deleteCard(id)
    )
    return card.generateCardElement();
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
    api.createCard(formData)
        .then(card => {
            imagesSection.addItem(getCard(card, true))

        }).catch(err => {
        console.log(err)
    })

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
const imagesSection = new Section(
    (cardParams) => imagesSection.addItem(getCard(cardParams, false)),
    sectionOptions.imagesContainer
)

api.getInitialCards().then(cards => {
    imagesSection.renderItems(cards);
}).catch(err => {
    console.log(err)
})


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

