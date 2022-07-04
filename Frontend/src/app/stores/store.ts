import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import IngredientStore from "./ingredientStore";
import ModalStore from "./modalStore";
import StorageStore from "./storageStore";
import UserStore from "./userStore";
import StatisticStore from "./statisticStore";

interface Store {
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
    statisticStore: new StatisticStore()
};


export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
