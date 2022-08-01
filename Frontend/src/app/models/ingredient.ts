import { Storage } from "./storage";

export interface Ingredient {
  id?: string;
  storageId?: string;
  storage: Storage;
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
