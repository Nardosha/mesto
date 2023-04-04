import {Card} from './Card.js'
import Popup from './Popup.js'
import {FormValidator} from "./FormValidator.js";
import '../pages/index.css'
import PopupWithImage from "./PopupWithImage";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm";


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

// PROFILE
const fillEditForm = () => {
    console.log('fillEditForm')
    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
}

const popupProfileEdit = () => {
    console.log('popupProfileEdit')
    fillEditForm();

    const editPopup = new PopupWithForm({
        selector: '.popup_edit',
        handleSubmit: (formData) => {
            console.log('submitHandler')
            profileName.textContent = formData.userFullName
            profileDescription.textContent = formData.userDescription
            editPopup.close()
        }
    })

    editPopup.open()
}

// PHOTO
const creatCard = (cardParams) => {
    const card = new Card({
        ...cardParams,
        selector: cardOptions.templateSelector,
        handleCardClick: ({target}) => {
            const popup = new PopupWithImage({selector: '.popup-show-photo', targetCard: target})
            popup.open()
        }
    })
    const cardElement = card.generateCardElement()
    imageList.addItem(cardElement)
}

const submitCardForm = (e) => {
    e.preventDefault()

    creatCard({
        name: inputPhotoDescription.value,
        link: inputPhotoSrc.value,
    })

    const currentForm = e.target
    currentForm.reset()

    const formName = currentForm.getAttribute('name')
    validatedForms[formName].resetValidation()
}

const imageList = new Section(
    {
        items: initialCards,
        renderer: (cardParams) => creatCard(cardParams)
    },
    '.content-photos__list'
)

imageList.renderItems()

// LISTENERS
cardForm.addEventListener('submit', submitCardForm)

editingProfileButton.addEventListener('click', popupProfileEdit)

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