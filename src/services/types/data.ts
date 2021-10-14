export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly __v: number;
}

export type TOrder = {
    readonly _id: string;
    readonly status: string;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly number: number;
    readonly ingredients: string[];
}