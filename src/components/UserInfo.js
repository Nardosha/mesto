export default class UserInfo {
    constructor(nameSelector, descriptionSelector, selector, loadUserInfo) {
        this._nameElement = document.querySelector(nameSelector)
        this._descriptionElement = document.querySelector(descriptionSelector)
        this._avatarElement = document.querySelector(selector)
        this._getUserInfo = loadUserInfo
        this._name = ''
        this._about = ''
        this._avatar = '';
        this._id = null
    }

    setAvatar({avatar}) {
        this._avatarElement.src = avatar
        this._avatarElement.alt = this._nameElement
    }

    updateUserInfoLayout() {
        this._nameElement.textContent = this._name
        this._descriptionElement.textContent = this._about
        this._avatarElement.src = this._avatar
        this._avatarElement.alt = this._avatar
    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about
        }
    }

    saveUserInfo({name, about, _id, avatar}) {
        this._name = name
        this._id = _id
        this._about = about
        this._avatar = avatar
    }

    loadUserInfo() {
        return this._getUserInfo()
    }
}