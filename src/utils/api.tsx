class Api {
    _baseUrl: string;

    constructor(baseURL: string) {
        this._baseUrl = baseURL;
    }

    _handleOriginalResponse(res: any) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}.`)
    }

    logout(refreshToken: string, accessToken: string) {
        return fetch(`${this._baseUrl}/auth/logout`, {
            method: "POST",
            body: JSON.stringify({token: refreshToken}),
            headers : {
                'Content-Type': 'application/json',
                "Authorization": accessToken,
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        })
    }
    getUsersOrderHistory(token: string) {
        return fetch(`${this._baseUrl}/orders`, {
            method: "GET",
            headers : {
                'Content-type': 'application/json',
                "Authorization": token,
            },
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        })
    }
    updateToken(token: string) {
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
    changeUserInfo(name: string, email: string, password: string, token: string) {
        const userData = {
            name,
            email,
            [password ? 'password' : '']: password,
        }
        console.log(userData, password);
        if (password) userData.password = password;
        return fetch(`${this._baseUrl}/auth/user`, {
            method: "PATCH",
            headers : {
                'Content-type': 'application/json',
                "Authorization": token,
            },
            body: JSON.stringify(userData)
        })
    }
    getUserInfo(token: string) {
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
    getIngredients() {
        return fetch(`${this._baseUrl}/ingredients`)
        .then((res) => {
            return this._handleOriginalResponse(res);
        });
    }
    getInitialOrders() {
        return fetch(`${this._baseUrl}/orders/all`)
        .then((res) => {
            return this._handleOriginalResponse(res);
        })
    }
    
    handleOrder(ingredients: ReadonlyArray<string>, token: string) {
        return fetch(`${this._baseUrl}/orders`, {
            method: "POST",
            body: JSON.stringify({ingredients}),
            headers : {
                'Content-Type': 'application/json',
                Authorization: token,
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        })
    }
    attemptLogin(user: {email: string, password: string}) {
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
    createNewUser(user: {email: string, password: string, name: string}) {
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
    forgotPassword(email: string) {
        return fetch(`${this._baseUrl}/password-reset`, {
            method: "POST",
            body: JSON.stringify({email}),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        });
    }
    resetPassword(password: string, token: string) {
        return fetch(`${this._baseUrl}/password-reset/reset`, {
            method: "POST",
            body: JSON.stringify({password, token}),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            return this._handleOriginalResponse(res);
        });
    }
}

const api = new Api("https://norma.nomoreparties.space/api");

export default api;