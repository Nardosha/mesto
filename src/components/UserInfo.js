export default class UserInfo {
    constructor(nameSelector, descriptionSelector, selector) {
        this._nameElement = document.querySelector(nameSelector)
        this._descriptionElement = document.querySelector(descriptionSelector)
        this._avatarElement = document.querySelector(selector)
        this._id = null
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._descriptionElement.textContent,
            id: this._id
        }
    }

    setUserInfo(info) {
        this._nameElement.textContent = info.name
        this._descriptionElement.textContent = info.about
        this._avatarElement.src = info.avatar
        this._avatarElement.alt = info.avatar
        this._id = info._id
    }
}