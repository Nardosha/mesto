// PROFILE
const profileName = document.querySelector('.profile__full-name')
const profileDescription = document.querySelector('.profile__description')
const editProfileButton = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('[data-edit-profile-popup]')
const editingProfilePopupForm = editProfilePopup.querySelector('.popup__form')
const inputName = editingProfilePopupForm.querySelector('.form__input_field_user-full-name')
const inputDescription = editingProfilePopupForm.querySelector('.form__input_field_user-description')

// PHOTO
const addImagePopup = document.querySelector('[data-add-photo-popup]')
const addingNewPhotoPopupForm = addImagePopup.querySelector('.popup__form')
const addPhotoButton = document.querySelector('.profile__add-button')
const inputImageDescription = document.querySelector('.form__input_field_image-description')
const inputImageSrc = document.querySelector('.form__input_field_image_src')
const photoTemplate = document.querySelector('.photo-template').content
const photoContainer = document.querySelector('.content-photos__list')

const closeButtons = document.querySelectorAll('[data-action]')


const photoPopup = document.querySelector('[data-photo-popup]')

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


const addPhoto = (photo) => {
    const photoElement = photoTemplate.cloneNode(true)
    photoElement.querySelector('.photo-item__description').textContent = photo.name
    photoElement.querySelector('.photo-item__img').src = photo.link
    photoElement.querySelector('.photo-item__img').alt = photo.name

    photoContainer.prepend(photoElement)
    const photoPreview = photoContainer.querySelector('.photo-item__img')
    const buttonsDelete = photoContainer.querySelector('.photo-item__button-delete')
    const buttonsLike = photoContainer.querySelector('.photo-item__button-like')
    buttonsLike.addEventListener('click', likeHandler)
    buttonsDelete.addEventListener('click', deleteHandler)
    photoPreview.addEventListener('click', openPhotoPopup)
}


const openEditProfilePopup = () => {
    editProfilePopup.classList.add('popup_opened')

    inputName.value = profileName.textContent
    inputDescription.value = profileDescription.textContent
}

const openAddImagePopup = () => {
    addImagePopup.classList.add('popup_opened')
}


const closePopup = () => {
    editProfilePopup.classList.remove('popup_opened')
    addImagePopup.classList.remove('popup_opened')
    photoPopup.classList.remove('popup_opened')
}

const submitEditingProfileForm = (e) => {
    e.preventDefault()

    profileName.textContent = inputName.value
    profileDescription.textContent = inputDescription.value
    closePopup()
}

const likeHandler = (e) => {
    e.target.classList.toggle('photo-item__button-like_active')
}

submitAddingPhotoForm = (e) => {
    e.preventDefault()

    const newPhoto = {
        name: inputImageDescription.value,
        link: inputImageSrc.value
    }
    addPhoto(newPhoto)

    inputImageDescription.value = ''
    inputImageSrc.value = ''

    closePopup()
}

const deleteHandler = (e) => {
    const photoElement = e.target.closest('.photo-item')
    photoElement.remove()
}

const openPhotoPopup = (e) => {
    const targetPhoto = e.target.closest('.photo-item')
    const targetSrc = targetPhoto.querySelector('.photo-item__img').src
    const targetDescription = targetPhoto.querySelector('.photo-item__description').textContent


    const photo = photoPopup.querySelector('.popup-show-photo__photo')
    const photoDescription = photoPopup.querySelector('.popup-show-photo__description')

    photo.src = targetSrc
    photo.alt = targetDescription
    photoDescription.textContent = targetDescription
    photoPopup.classList.add('popup_opened')
}

initialCards.map(addPhoto)

editProfileButton.addEventListener('click', openEditProfilePopup)
addPhotoButton.addEventListener('click', openAddImagePopup)
closeButtons.forEach(btn => {
    if (btn.dataset.action === 'CLOSE') {
    btn.addEventListener('click', closePopup)
    }
})
editingProfilePopupForm.addEventListener('submit', submitEditingProfileForm)
addingNewPhotoPopupForm.addEventListener('submit', submitAddingPhotoForm)

