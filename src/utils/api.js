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
    handleOrder(ingredients) {
        return fetch(`${this._baseUrl}/orders`, {
            method: "POST",
            body: JSON.stringify({ingredients}),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        })
    }
    getUserInfo(token) {
        return fetch(`${this._baseUrl}/auth/user`, {
            headers : {
                'Content-Type': 'application/json',
                "Authorization": token,
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        });
    }
    loginUser(user) {
        return fetch(`${this._baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        });
    }
    createNewUser(user) {
        return fetch(`${this._baseUrl}/auth/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        });
    }
    updateToken(token) {
        return fetch(`${this._baseUrl}/auth/token`, {
            method: "POST",
            body: JSON.stringify({token}),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        })
    }
}

const api = new Api("https://norma.nomoreparties.space/api");

export default api;