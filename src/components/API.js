export default class Api {
    constructor(config) {
        this.url = `${config.url}/${config.cohort}`;
        this.headers = config.headers

    }

    loadUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Error: ${res?.message || res?.status}`)
            })
    }

    editUserInfo(userInfo) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Error: ${res?.message || res?.status}`)
            })
    }

    editUserAvatar(avatar) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Error: ${res?.message || res?.status}`)
            })
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Error: ${res?.message || res?.status}`)
            })
    }

    createCard(cardParams) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(cardParams)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Error: ${res?.message || res?.status}`)
        })
    }

    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Error: ${res?.message || res?.status}`)
        })
    }

    likeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Error: ${res?.message || res?.status}`)
        })
    }

    dislikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Error: ${res?.message || res?.status}`)
        })
    }
}