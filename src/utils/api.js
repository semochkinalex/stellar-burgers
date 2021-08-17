class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _handleOriginalResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}.`)
    }

    getIngredients() {
        return fetch(`${this._baseUrl}/ingredients`)
        .then((res) => {
            return this._handleOriginalResponse(res);
        });
    }
}

const api = new Api("https://norma.nomoreparties.space/api");

export default api;