export default class Api {
    constructor(config) {
        this.url = `${config.url}/${config.cohort}`;
        this.headers = config.headers

    }

    getCards() {
        console.log(this.headers)
        return fetch(`${this.url}/cards`, {headers: this.headers})
             .then(res => res.json())
    }

    createCard(cardParams) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            'Content-Type': 'application/json',
            body: JSON.stringify(cardParams)
        }).then(res => res.json())
    }
}