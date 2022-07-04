import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {IIngredient} from "../models/ingredient";
import {store} from "./store";
import {compareAsc} from "date-fns";
import {v4 as uuid} from "uuid";
import Fuse from 'fuse.js'

export default class IngredientStore {
    ingredientRegistry = new Map<string, IIngredient>();
    selectedIngredient: IIngredient | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInit = true;

    private _ingredients: IIngredient[];
    public get ingredients() {
        return this._ingredients === undefined
            ? Array.from(this.ingredientRegistry.values()).sort((_a, _b) => {
                return (new Date(_b.expirationDate).getTime() - new Date(_a.expirationDate).getTime())
            })
            : this._ingredients;
    }

    public set ingredients(value) {
        this._ingredients = value;
    }

    filterByName = (inputQuery?: string) => {
        if (inputQuery) {
            const fuse = new Fuse<IIngredient>(this.ingredientsByDate, {
                minMatchCharLength: 1,
                useExtendedSearch: true,
                keys: [
                    {
                        name: 'name',
                        getFn: (ingredient) => ingredient.name,
                        weight: 0.7
                    },
                    {
                        name: 'storage',
                        getFn: (ingredient) => ingredient.storage.name,
                        weight: 0.3
                    },
                ]
            });

            // UNIX-like searching ' -> for items that include
            // const query = `'${text}`;
            const query = {$or: [{name: `'${inputQuery}`}, {storage: `'${inputQuery}`}]}

            const result = fuse.search(query);
            return result.map(({item}) => item);
        } else {
            return this.ingredientsByDate;
        }
    }

    filterByColor = (color?: string) => {
        if (color) {
            const fuse = new Fuse<IIngredient>(this.ingredientsByDate, {
                minMatchCharLength: 1,
                useExtendedSearch: true,
                keys: [
                    {
                        name: 'colorTag',
                        getFn: (ingredient) => ingredient.colorTag,
                    }
                ]
            });
            const query = {colorTag: `'${color}`};
            const result = fuse.search(query);
            return result.map(({item}) => item);
        } else {
            return this.ingredientsByDate
        }
    }

    constructor() {
        makeAutoObservable(this);
    }


    get ingredientsByDate() {
        return Array.from(this.ingredientRegistry.values()).sort((a, b) => {
            return compareAsc(new Date(a.expirationDate).getTime(), new Date(b.expirationDate).getTime());
        });
    }

    get expiringIngredients() {
        return Array.from(this.ingredientRegistry.values()).filter(ingredient => ingredient.expirationDate.getTime() >= Date.now()).sort((a, b) => {
            return compareAsc(new Date(a.expirationDate).getTime(), new Date(b.expirationDate).getTime());
        });
    }

    get expiredIngredients() {
        return Array.from(this.ingredientRegistry.values()).filter(ingredient => ingredient.expirationDate.getTime() < Date.now()).sort((a, b) => {
            return compareAsc(new Date(a.expirationDate).getTime(), new Date(b.expirationDate).getTime());
        });
    }

    loadIngredients = async () => {
        try {
            const ingredients = await agent.Ingredients.list();
            runInAction(() => {
                ingredients.forEach((ingredient) => {
                    ingredient.expirationDate = new Date(ingredient.expirationDate)
                    ingredient.created = new Date(ingredient.created);
                    this.ingredientRegistry.set(ingredient.id, ingredient);
                });
            })
            this.setLoadingInit(false);
        } catch (er) {
            console.log(er);
            this.setLoadingInit(false);
        }
    };

    setLoadingInit = (state: boolean) => {
        this.loadingInit = state;
    };

    selectIngredient = (id: string) => {
        this.selectedIngredient = this.ingredientRegistry.get(id);
    };

    cancelSelectedIngredient = () => {
        this.selectedIngredient = undefined;
    };

    openForm = (id?: string) => {
        id ? this.selectIngredient(id) : this.cancelSelectedIngredient();
        this.editMode = true;
    };

    closeForm = () => {
        this.editMode = false;
    };

    createIngredient = async (ingredient: IIngredient) => {
        this.loading = true;
        ingredient.id = uuid();
        ingredient.expirationDate = new Date(ingredient.expirationDate);
        this.fixDateUTC(ingredient);
        console.log(ingredient.expirationDate.toISOString() + ' cREATED');
        try {
            await agent.Ingredients.create(ingredient);
            runInAction(() => {
                this.ingredientRegistry.set(ingredient.id, ingredient);
                this.selectedIngredient = ingredient;
                this.editMode = false;
                this.loading = false;
                store.modalStore.closeModal();
            });
        } catch (er) {
            console.log(er);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updateIngredient = async (ingredient: IIngredient) => {
        this.loading = true;
        console.log(ingredient.expirationDate + " before")
        ingredient.expirationDate = new Date(ingredient.expirationDate);
        this.fixDateUTC(ingredient);
        console.log(ingredient.expirationDate.toISOString() + ' UPDATE');
        try {
            await agent.Ingredients.update(ingredient);
            runInAction(() => {
                this.ingredientRegistry.set(ingredient.id, ingredient);
                this.selectedIngredient = ingredient;
                this.editMode = false;
                this.loading = false;
            });
        } catch (er) {
            console.log(er);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deleteIngredient = async (id: string) => {
        this.loading = true;
        try {
            await agent.Ingredients.delete(id);
            runInAction(() => {
                this.ingredientRegistry.delete(id);
                if (this.selectedIngredient?.id === id) {
                    this.cancelSelectedIngredient();
                }
                this.loading = false;
            });
        } catch (er) {
            console.log(er);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    fixDateUTC = (ingredient: IIngredient) => {
        const now = new Date(Date.now());
        ingredient.expirationDate.setUTCHours(now.getUTCHours());
        ingredient.expirationDate.setUTCMinutes(now.getUTCMinutes());
        ingredient.expirationDate.setUTCSeconds(now.getUTCSeconds());
        ingredient.expirationDate.setUTCMilliseconds(now.getUTCMilliseconds());
        return ingredient;
    }
}
