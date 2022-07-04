import {IIngredient} from "./ingredient";

export interface IStorage {
    id?: string;
    name: string;
    created?: Date,
    ingredients?: IIngredient[]
}
