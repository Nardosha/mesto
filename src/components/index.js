import {Card} from './Card.js'
import Popup from './Popup.js'
import {FormValidator} from "./FormValidator.js";
import '../pages/index.css'


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
const cardForm = addPhotoPopup.querySelector('.popup__form')
const inputPhotoDescription = document.querySelector('.form__input_field_image-description')
const inputPhotoSrc = document.querySelector('.form__input_field_image-src')

const photosContainer = document.querySelector('.content-photos__list')
const closePopupButtons = document.querySelectorAll('.popup__button-close')
const photoPopup = document.querySelector('[data-popup-type="SHOW"]')
const previewPhoto = photoPopup.querySelector('.popup-show-photo__photo')
const previewPhotoDescription = photoPopup.querySelector('.popup-show-photo__description')

const validatedForms = {}

export const validationOptions = {
    popupOpenedSelector: '.popup_opened',
    popupForm: '.popup__form',
    formSelector: '.form',
    formInputsSelector: '.form__inputs',
    formInputSelector: '.form__input',
    formInputClass: 'form__input',
    formInputTypeErrorClass: 'form__input_type_error',
    formInputErrorActiveClass: 'form__input-error_active',
    formButtonSubmitSelector: '.form__button-submit',
    formButtonSubmitClass: 'form__button-submit',
    formButtonSubmitTypeDisabledClass: 'form__button-submit_type_disabled',
}

export const cardOptions = {
    elementSelector: '.photo-item',
    templateSelector: '.photo-template',
    imageSelector: '.photo-item__img',
    descriptionSelector: '.photo-item__description',
    buttonLikeSelector: '.photo-item__button-like',
    buttonLikeActiveClass: 'photo-item__button-like_active',
    buttonDeleteSelector: '.photo-item__button-delete',
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// POPUP
export const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    document.addEventListener('keyup', closeByEscape)
    document.addEventListener('mousedown', closeByClick)
}

export const closePopup = (popup) => {
    console.log('closePopup', popup)
    popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', closeByEscape)
    document.removeEventListener('mousedown', closeByClick)
}

const closeByEscape = (e) => {
    const pressedKey = e.code

    if (pressedKey === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        openedPopup && closePopup(openedPopup)
    }
}

const closeByClick = (e) => {
    const clickTarget = e.target

    if (clickTarget?.classList.contains('popup_opened')) {
        closePopup(clickTarget)
    }
}


// PROFILE
const fillEditForm = () => {
    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
}

const openProfileFormPopup = () => {
    openPopup(editProfilePopup)
    fillEditForm()
}

const submitProfileForm = (e) => {
    e.preventDefault()
    profileName.textContent = inputName.value
    profileDescription.textContent = inputDescription.value
    closePopup(editProfilePopup)
}


// PHOTO
export const openPhotoPopup = (e) => {
    const targetPhoto = e.target.closest('.photo-item')
    const targetSrc = targetPhoto.querySelector('.photo-item__img').src
    const targetDescription = targetPhoto.querySelector('.photo-item__description').textContent

    previewPhoto.src = targetSrc
    previewPhoto.alt = targetDescription
    previewPhotoDescription.textContent = targetDescription

    openPopup(photoPopup)
}

const creatCard = (cardParams) => {
    const newCard = new Card(cardParams)
    return newCard.generateCardElement()
}

const renderPhoto = (photoNode) => {
    photosContainer.prepend(photoNode)
}

// const openCardFormPopup = () => {
//     openPopup(addPhotoPopup)
// }

const submitCardForm = (e) => {
    e.preventDefault()

    const cardElement = creatCard({
        name: inputPhotoDescription.value,
        link: inputPhotoSrc.value,
        selector: cardOptions.templateSelector
    })
    renderPhoto(cardElement)

    const currentForm = e.target
    currentForm.reset()

    const formName = currentForm.getAttribute('name')
    validatedForms[formName].resetValidation()

    closePopup(addPhotoPopup)
}

initialCards.forEach(cardParams => {
    const cardElement = creatCard({...cardParams, selector: cardOptions.templateSelector})
    renderPhoto(cardElement)
})


// LISTENERS
editingProfilePopupForm.addEventListener('submit', submitProfileForm)

cardForm.addEventListener('submit', submitCardForm)

editingProfileButton.addEventListener('click', (e) => {
    const editPopup = new Popup('.popup_edit')
    editPopup.open()
})

addPhotoButton.addEventListener('click', () => {
    const addImagePopup = new Popup('.popup_add-photo')
    addImagePopup.open()
})

// VALIDATION
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

enableValidations(validationOptions)