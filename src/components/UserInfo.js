export default class UserInfo {
    constructor(nameSelector, descriptionSelector, link) {
        this._nameElement = document.querySelector(nameSelector)
        this._descriptionElement = document.querySelector(descriptionSelector)
        this._userAvatar = link
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