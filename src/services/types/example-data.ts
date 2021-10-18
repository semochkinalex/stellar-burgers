import { TIngredient, TOrder } from "./data";

export const bun: TIngredient = {
    "_id": "60d3b41abdacab0026a733c6",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
};

export const meat: TIngredient = {
    "_id": "60d3b41abdacab0026a733ca",
    "name": "Говяжий метеорит (отбивная)",
    "type": "main",
    "proteins": 800,
    "fat": 800,
    "carbohydrates": 300,
    "calories": 2674,
    "price": 3000,
    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v": 0
};

export const exampleUserOrder: TOrder = {
    _id: "615c65d77deb54001ba5f586",
    createdAt: "2021-10-05T14:48:55.692Z",
    ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cc", "60d3b41abdacab0026a733c7"],
    name: "Флюоресцентный space spicy бургер",
    number: 4249,
    status: "done",
    updatedAt: "2021-10-05T14:48:55.829Z",
}
export const feed: {success: boolean, orders: ReadonlyArray<TOrder>} = {
    success: true,
    orders: [],
}

export const exampleOrder: {name: string, number: number} = {
    name: "Биг Мак",
    number: 999,
}