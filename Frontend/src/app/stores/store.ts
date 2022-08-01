import { createContext, useContext } from "react";
import { CommonStore } from "./common";
import { IngredientStore } from "./ingredient";
import { ModalStore } from "./modal";
import { StatisticStore } from "./statistic";
import { StorageStore } from "./storage";
import { UserStore } from "./user";

export interface Store {
  ingredientStore: IngredientStore;
  storageStore: StorageStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  statisticStore: StatisticStore;
}

export const store: Store = {
  ingredientStore: new IngredientStore(),
  storageStore: new StorageStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  statisticStore: new StatisticStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext) as typeof store;
};
