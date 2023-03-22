import { enableValidation, toggleButtonState } from './validate.js'
import { validationOptions } from './variables.js'
import { Card } from './Card.js'

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
const addPhotoPopupContainer = addPhotoPopup.querySelector('.popup__form')
const inputPhotoDescription = document.querySelector('.form__input_field_image-description')
const inputPhotoSrc = document.querySelector('.form__input_field_image-src')
const photoTemplate = document.querySelector('.photo-template').content

const photosContainer = document.querySelector('.content-photos__list')
const closePopupButtons = document.querySelectorAll('.popup__button-close')
const photoPopup = document.querySelector('[data-popup-type="SHOW"]')
const previewPhoto = photoPopup.querySelector('.popup-show-photo__photo')
const previewPhotoDescription = photoPopup.querySelector('.popup-show-photo__description')

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

const fillEditForm = () => {
    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
}

export const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    document.addEventListener('keyup', closeByEscape)
    document.addEventListener('mousedown', closeByClick)
}

export const closePopup = (popup) => {
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

const toggleLikeButton = (e) => {
    e.target.classList.toggle('photo-item__button-like_active')
}

const handleDelete = (e) => {
    const photoNode = e.target.closest('.photo-item')
    photoNode.remove()
}

export const openPhotoPopup = (e) => {
    const targetPhoto = e.target.closest('.photo-item')
    const targetSrc = targetPhoto.querySelector('.photo-item__img').src
    const targetDescription = targetPhoto.querySelector('.photo-item__description').textContent

    previewPhoto.src = targetSrc
    previewPhoto.alt = targetDescription
    previewPhotoDescription.textContent = targetDescription

    openPopup(photoPopup)
}

const addEventListeners = (photoNode) => {
    const buttonLike = photoNode.querySelector('.photo-item__button-like')
    const buttonDelete = photoNode.querySelector('.photo-item__button-delete')
    const image = photoNode.querySelector('.photo-item__img')

    buttonLike.addEventListener('click', toggleLikeButton)
    buttonDelete.addEventListener('click', handleDelete)
    image.addEventListener('click', openPhotoPopup)
}

const renderPhoto = (photoNode) => {
    photosContainer.prepend(photoNode)
}

const createNewPhoto = (photo) => {
    const photoElement = photoTemplate.cloneNode(true)
    const imageDescription = photoElement.querySelector('.photo-item__description');
    const image = photoElement.querySelector('.photo-item__img');

    imageDescription.textContent = photo.name
    image.src = photo.link
    image.alt = photo.name

    addEventListeners(photoElement)
    return photoElement
}

const openEditProfilePopup = () => {
    openPopup(editProfilePopup)
    fillEditForm()
}

const openAddPhotoPopup = () => {
    openPopup(addPhotoPopup)
}

const submitEditingProfileForm = (e) => {
    e.preventDefault()
    profileName.textContent = inputName.value
    profileDescription.textContent = inputDescription.value
    closePopup(editProfilePopup)
}

const submitAdjustingNewPhoto = (e) => {
    e.preventDefault()

    const currentForm = e.target
    const buttonSubmit = e.submitter
    const inputList = Array.from(currentForm.elements)

    const newPhotoParams = {
        name: inputPhotoDescription.value,
        link: inputPhotoSrc.value
    }
    const newPhoto = createNewPhoto(newPhotoParams)

    renderPhoto(newPhoto)
    currentForm.reset()

    toggleButtonState(inputList, buttonSubmit, validationOptions.formButtonSubmitTypeDisabledClass)
    closePopup(addPhotoPopup)
}

initialCards.forEach(cardParams => {
    const card = new Card({...cardParams, selector: '.photo-template'})
    const cardElement = card.generateCardElement()

    renderPhoto(cardElement)
})

// LISTENERS
editingProfilePopupForm.addEventListener('submit', submitEditingProfileForm)

addPhotoPopupContainer.addEventListener('submit', submitAdjustingNewPhoto)

editingProfileButton.addEventListener('click', openEditProfilePopup)

addPhotoButton.addEventListener('click', openAddPhotoPopup)

closePopupButtons.forEach(btn => {
    const popup = btn.closest('.popup')
    const actionType = btn.dataset.action

    if (actionType === 'CLOSE') {
        btn.addEventListener('click', () => closePopup(popup))
    }
})

enableValidation(validationOptions);
