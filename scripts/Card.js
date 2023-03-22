import { openPhotoPopup } from './index.js'

export class Card {
    constructor({name, link, selector}) {
        this.description = name
        this.link = link
        this._isLiked = false
        this.templateSelector = selector
        this._cardElement = null
    }

    _getTemplate() {
        return document
            .querySelector(this.templateSelector)
            .content
            .querySelector('.photo-item')
            .cloneNode(true)
    }

    _setCardElement() {
        this._cardElement = this._getTemplate()
        this._imageElement = this._cardElement.querySelector('.photo-item__img')
        this.descriptionElement = this._cardElement.querySelector('.photo-item__description')
        this._buttonLikeElement = this._cardElement.querySelector('.photo-item__button-like')
        this._buttonDeleteElement = this._cardElement.querySelector('.photo-item__button-delete')
    }

    generateCardElement() {
        this._setCardElement()
        this._setEventListeners()

        this._imageElement.src = this.link
        this._imageElement.alt = this.link
        this.descriptionElement.textContent = this.description

        return this._cardElement
    }

    _setEventListeners() {
        this._buttonLikeElement.addEventListener('click', () => this._toggleLike())
        this._buttonDeleteElement.addEventListener('click', () => this._handleDelete())
        this._imageElement.addEventListener('click', openPhotoPopup)
    }

    _toggleLike() {
        this._buttonLikeElement.classList.toggle('photo-item__button-like_active')
        this._isLiked = !this._isLiked
    }

    _handleDelete() {
        this._cardElement.remove()
    }
}