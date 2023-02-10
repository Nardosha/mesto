// PROFILE
const profileName = document.querySelector('.profile__full-name')
const profileDescription = document.querySelector('.profile__description')

// EDIT PROFILE POPUP
const editProfilePopup = document.querySelector('[data-popup-type="EDIT"]')
const editingProfilePopupForm = editProfilePopup.querySelector('.popup__form')
const inputName = editingProfilePopupForm.querySelector('.form__input_field_user-full-name')
const inputDescription = editingProfilePopupForm.querySelector('.form__input_field_user-description')

// ADD PHOTO POPUP
const addPhotoPopup = document.querySelector('[data-popup-type="ADD"]')
const addPhotoPopupContainer = addPhotoPopup.querySelector('.popup__form')
const inputPhotoDescription = document.querySelector('.form__input_field_image-description')
const inputPhotoSrc = document.querySelector('.form__input_field_image-src')
const photoTemplate = document.querySelector('.photo-template').content

const photosContainer = document.querySelector('.content-photos__list')
const closePopupButtons = document.querySelectorAll('.popup__button-close')
const openPopupButtons = document.querySelectorAll('[data-action="OPEN"]')
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

const openPopup = (popup) => {
    popup.classList.add('popup_opened')
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened')
}

const renderPhoto = (photoNode) => {
    photosContainer.prepend(photoNode)
}

const addPhoto = (photo) => {
    const photoElement = photoTemplate.cloneNode(true)
    photoElement.querySelector('.photo-item__description').textContent = photo.name
    photoElement.querySelector('.photo-item__img').src = photo.link
    photoElement.querySelector('.photo-item__img').alt = photo.name

    renderPhoto(photoElement)
}

const submitEditingProfileForm = (e) => {
    e.preventDefault()
    profileName.textContent = inputName.value
    profileDescription.textContent = inputDescription.value
    closePopup(editProfilePopup)
}

const likeHandler = (e) => {
    e.target.classList.toggle('photo-item__button-like_active')
}

const deleteHandler = (e) => {
    const photoNode = e.target.closest('.photo-item')
    photoNode.remove()
}

const openPhotoPopup = (e) => {
    const targetPhoto = e.target.closest('.photo-item')
    const targetSrc = targetPhoto.querySelector('.photo-item__img').src
    const targetDescription = targetPhoto.querySelector('.photo-item__description').textContent

    previewPhoto.src = targetSrc
    previewPhoto.alt = targetDescription
    previewPhotoDescription.textContent = targetDescription

    openPopup(photoPopup)
}

const photoActionHandler = (e) => {
    const actionType = e.target?.dataset.action

    if (actionType === 'DELETE') {
        deleteHandler(e)
    }

    if (actionType === 'LIKE') {
        likeHandler(e)
    }

    if (actionType === 'PREVIEW') {
        openPhotoPopup(e)
    }

}

submitAddingPhotoForm = (e) => {
    e.preventDefault()

    const newPhoto = {
        name: inputPhotoDescription.value,
        link: inputPhotoSrc.value
    }
    addPhoto(newPhoto)
    e.target.reset()
    closePopup(addPhotoPopup)
}

initialCards.map(addPhoto)

// LISTENERS
editingProfilePopupForm.addEventListener('submit', submitEditingProfileForm)

addPhotoPopupContainer.addEventListener('submit', submitAddingPhotoForm)

openPopupButtons.forEach(btn => {
    const popupType = btn.dataset.actionType

    if (popupType === 'EDIT') {
        btn.addEventListener('click', () => openPopup(editProfilePopup))
        fillEditForm()
    }

    if (popupType === 'ADD') {
        btn.addEventListener('click', () => openPopup(addPhotoPopup))
    }
})

closePopupButtons.forEach(btn => {
    const popup = btn.closest('.popup')
    const actionType = btn.dataset.action

    if (actionType === 'CLOSE') {
        btn.addEventListener('click', () => closePopup(popup))
    }
})

photosContainer.addEventListener('click', photoActionHandler)