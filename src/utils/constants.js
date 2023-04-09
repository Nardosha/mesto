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

export const popupOptions = {
    closeButtonSelector: '.popup__button-close',
    openedPopupSelector: '.popup_opened',
    openedPopupClass: 'popup_opened',
}

export const popupWithFormOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    formEditProfilePopupSelector: '.popup_edit',
      formAddImagePopupSelector: '.popup_add-photo',
}

export const popupWithImageOptions = {
    imagePopupSelector:'.popup-show-photo',
    imageSelector: '.popup-show-photo__photo',
    descriptionSelector: '.popup-show-photo__description',
}

export const profileOptions = {
    profileNameSelector: '.profile__full-name',
    profileDescriptionSelector: '.profile__description',
}

export const sectionOptions = {
    imagesContainer: '.content-photos__list',
}

export const editingProfileButton = document.querySelector('.profile__edit-button')
export const addPhotoButton = document.querySelector('.profile__add-button')

const editProfilePopup = document.querySelector('[data-popup-type="EDIT"]')
const editingProfilePopupForm = editProfilePopup.querySelector('.popup__form')

export const profileFormSelectors = {
    inputName: editingProfilePopupForm.querySelector('.form__input_field_user-full-name'),
    inputDescription: editingProfilePopupForm.querySelector('.form__input_field_user-description')
}

export const initialCards = [
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