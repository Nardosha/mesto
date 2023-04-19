export default class UserInfo {
    constructor(nameSelector, descriptionSelector, selector) {
        this._nameElement = document.querySelector(nameSelector)
        this._descriptionElement = document.querySelector(descriptionSelector)
        this._avatarElement = document.querySelector(selector)
    }

    setAvatar({link}) {
        this._avatarElement.src = link
        this._avatarElement.alt = this._nameElement
    }

    setUserInfo({name, description}) {
        this._nameElement.textContent = name
        this._descriptionElement.textContent = description
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._descriptionElement.textContent
        }
    }
}