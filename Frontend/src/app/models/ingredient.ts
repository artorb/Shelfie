import {IStorage} from "./storage";

export interface IIngredient {
    storage: IStorage,
    id?: string;
    name: string;
    amountUnits?: number;
    colorTag?: string;
    carbs?: number;
    fats?: number;
    proteins?: number;
    weight?: number;
    calories?: number;
    expirationDate?: Date;
    created?: Date;

    type?: string;
    picture?: string;
    expired?: boolean;
}
