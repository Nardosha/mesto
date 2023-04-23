import {cardOptions} from '../utils/constants.js'

export class Card {
    constructor({_id, name, link, likes, isOwnCard}, selector, handleCardClick, openConfirmationPopup, likeHandler, dislikeHandler, deleteHandler) {
        this.description = name
        this.link = link
        this._likes = likes.length
        this._isOwnCard = isOwnCard
        this._isLiked = false
        this.templateSelector = selector
        this._handleCardClick = handleCardClick
        this._openConfirmationPopup = openConfirmationPopup
        this._likeHandler = likeHandler
        this._dislikeHandler = dislikeHandler
        this._deleteHandler = deleteHandler
        this._id = _id
    }


    generateCardElement() {
        this._setCardElement()
        this._setEventListeners()

        this._imageElement.src = this.link
        this._imageElement.alt = this.link
        this.descriptionElement.textContent = this.description
        this._likeCounter.textContent = this._likes

        if (!this._isOwnCard) {
            this._hideDeleteButton()
        }

        return this._cardElement
    }

    _setCardElement() {
        this._cardElement = this._getTemplate()
        this._imageElement = this._cardElement.querySelector(cardOptions.imageSelector)
        this.descriptionElement = this._cardElement.querySelector(cardOptions.descriptionSelector)
        this._buttonLikeElement = this._cardElement.querySelector(cardOptions.buttonLikeSelector)
        this._likeCounter = this._cardElement.querySelector(cardOptions.likesSelector)
        this._buttonDeleteElement = this._cardElement.querySelector(cardOptions.buttonDeleteSelector)
    }

    _getTemplate() {
        return document
            .querySelector(this.templateSelector)
            .content
            .querySelector(cardOptions.elementSelector)
            .cloneNode(true)
    }

    _setEventListeners() {
        this._buttonLikeElement.addEventListener('click', this._toggleLike.bind(this))
        this._buttonDeleteElement.addEventListener('click', this._openConfirmationPopup)
        this._imageElement.addEventListener('click', this._handleCardClick.bind(this))
    }

    updateLikes(data) {
        this._likes = data.likes.length
        this._likeCounter.textContent = this._likes
    }

    _toggleLikeClass() {
        this._buttonLikeElement.classList.toggle(cardOptions.buttonLikeActiveClass)
        this._isLiked = !this._isLiked
    }

    _toggleLike() {
        this._isLiked ? this._handleDislike() : this._handleLike();

    }

    _handleLike() {
        this._toggleLikeClass();
        this._likeHandler(this._id)
    }

    _handleDislike() {
        this._toggleLikeClass();
        this._dislikeHandler(this._id)
    }

    handleDelete() {
        this._deleteHandler(this._id)
        this._cardElement.remove()
    }

    _hideDeleteButton() {
        this._buttonDeleteElement.classList.add(cardOptions.buttonDeleteHiddenClass)
    }
}