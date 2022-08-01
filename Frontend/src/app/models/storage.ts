import {Ingredient} from "./ingredient";

export interface Storage {
    id?: string;
    name: string;
    created?: Date,
    ingredients?: Ingredient[]
}
