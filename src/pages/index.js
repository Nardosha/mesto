import {Card} from '../components/Card.js'
import {FormValidator} from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import {
    validationOptions,
    cardOptions,
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


// CARD
const imagePopup = new PopupWithImage(
    popupWithImageOptions.imagePopupSelector
)

imagePopup.setEventListeners()

const deleteCard = (id) => {
    api.deleteCard(id)
        .then(res => {
            console.log('Success!, ', res?.message || 'card has been successfully deleted')
        }).catch(err => {
        console.log(err)
    })
}

const likeCard = (card, id) => {
    api.likeCard(id)
        .then(res => {
            card.updateLikes(res)
        }).catch(err => {
        console.log(err)
    })
}

const dislikeCard = (card, id) => {
    api.dislikeCard(id)
        .then(res => {
            card.updateLikes(res)
        }).catch(err => {
        console.log(err)
    })
}

const getCardInfo = ({_id, likes, owner}) => {
    const userId = userProfile.getUserInfo().id;

    return {
        isOwnCard: userId === owner._id,
        isLiked: likes.find(user => user._id === userId),
    }
}

const getCard = (cardParams) => {
    const card = new Card({...cardParams, ...getCardInfo(cardParams)},
        cardOptions.templateSelector,
        () => {
            imagePopup.open({name: cardParams.name, link: cardParams.link})
        },
        () => {
            confirmationPopup._handleAction = () => card.handleDelete();
            confirmationPopup.open();
        },
        (id) => likeCard(card, id),
        (id) => dislikeCard(card, id),
        (id) => deleteCard(id)
    )
    return card.generateCardElement();
}


// PROFILE
const userProfile = new UserInfo(
    profileOptions.profileNameSelector,
    profileOptions.profileDescriptionSelector,
    profileOptions.profileAvatarSelector,
)

api.loadUserInfo()
    .then(res => {
            userProfile.setUserInfo(res)
            return initialCards
        })
    .then((cards) => {
        imagesSection.renderItems(cards)
})
    .catch(err => {
        console.log(err)
    })

// FORMS
const submitAvatarForm = (formData) => {
    api.editUserAvatar(formData).then(res => {
        userProfile.setUserInfo(res)
        avatarPopup.close()
    }).catch(err => {
        console.log(err)
    })
}

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
            imagesSection.addItem(getCard(card))
            formImagePopup.close();
        }).catch(err => {
        console.log(err)
    })
}

const submitProfileForm = (formData) => {
    api.editUserInfo(formData)
        .then(res => {
            userProfile.setUserInfo(res)
            formProfilePopup.close();
        }).catch(err => {
        console.log(err)
    })
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
    (cardParams) => imagesSection.addItem(getCard(cardParams)),
    sectionOptions.imagesContainer
)

const initialCards = api.getInitialCards()

enableValidations(validationOptions)


// LISTENERS
editingProfileButton.addEventListener('click', openProfileFormPopup)

addPhotoButton.addEventListener('click', () => {
    const formName = formImagePopup.getFormName()
    validatedForms[formName].resetValidation()
    formImagePopup.open()
})

avatarButton.addEventListener('click', () => {
    const formName = avatarPopup.getFormName()
    validatedForms[formName].resetValidation()

    avatarPopup.open()
})

