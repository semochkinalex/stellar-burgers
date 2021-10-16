export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: "bun" | "main" | "sauce";
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly __v: number;

    count?: number;
    index?: number;
    isLocked?: boolean;
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

export interface IHistoryState {
    location: {
        pathname: string,
        state: {
            from: {
                pathname: string;
            }
        }
    }
    replace: any; // чё тут O_O
    action: string;
}

export interface ILocationState {
    state: {
        background: string;
    }
}