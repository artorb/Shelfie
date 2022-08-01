import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Ingredient } from "../../models/ingredient";
import { compareAsc } from "date-fns";
import { v4 as uuid } from "uuid";
import Fuse from "fuse.js";

export interface ColorFilter {
  slate: boolean;
  green: boolean;
  sky: boolean;
  red: boolean;
  amber: boolean;
  fuchsia: boolean;
  blue: boolean;
}

export class IngredientStore {
  ingredientRegistry = new Map<string, Ingredient>();
  selectedIngredient: Ingredient | undefined = undefined;
  editMode = false;
  loading = false;
  error = false;
  loadingInit = true;
  termFilter: string = "";

  colortagFilter: ColorFilter = {
    amber: false,
    blue: false,
    fuchsia: false,
    green: false,
    red: false,
    sky: false,
    slate: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  get filteredByTerm() {
    const data = this.filteredByColor;

    const term = this.termFilter;

    if (term.length > 0 && term) {
      const fuse = new Fuse<Ingredient>(data, {
        minMatchCharLength: 1,
        useExtendedSearch: true,
        keys: [
          {
            name: "name",
            getFn: (ingredient) => ingredient?.name,
            weight: 0.7,
          },
          {
            name: "storage",
            getFn: (ingredient) => ingredient?.storage?.name,
            weight: 0.3,
          },
        ],
      });

      const query = {
        $or: [{ name: `'${term}` }, { storage: `'${term}` }],
      };

      const result = fuse.search(query).map(({ item }) => item);
      return result;
    } else return data;
  }

  get filteredByColor() {
    const { amber, blue, fuchsia, green, red, sky, slate } =
      this.colortagFilter;
    if (!amber && !blue && !fuchsia && !green && !red && !sky && !slate) {
      return this.ingredientsByDate;
    }

    const fuse = new Fuse<Ingredient>(this.ingredientsByDate, {
      minMatchCharLength: 3,
      useExtendedSearch: true,
      keys: [
        {
          name: "colorTag",
          getFn: (ingredient) => ingredient.colorTag,
        },
      ],
    });

    let color = `${amber ? "amber | " : ""}${blue ? "blue | " : ""}${
      fuchsia ? "fuchsia | " : ""
    }${green ? "green | " : ""}${red ? "red | " : ""}${sky ? "sky | " : ""}${
      slate ? "slate | " : ""
    }
    `.trim();
    const query = { colorTag: `=${color}` };
    const result = fuse.search(query);
    return result.map(({ item }) => item);
  }

  get ingredientsByDate() {
    return Array.from(this.ingredientRegistry.values()).sort((a, b) => {
      return compareAsc(
        new Date(a.expirationDate).getTime(),
        new Date(b.expirationDate).getTime()
      );
    });
  }

  get expiringIngredients() {
    const today = new Date(Date.now());
    const threshold = new Date(new Date().setDate(today.getDate() + 30));
    return Array.from(this.ingredientRegistry.values())
      .filter((ingredient) => ingredient.expirationDate.getTime() >= Date.now())
      .filter((ingredient) => {
        return (
          new Date(ingredient.expirationDate).setDate(
            ingredient.expirationDate.getDate() - 30
          ) <= threshold.getTime()
        );
      })
      .sort((a, b) => {
        return compareAsc(
          new Date(a.expirationDate).getTime(),
          new Date(b.expirationDate).getTime()
        );
      });
  }

  get expiredIngredients() {
    return Array.from(this.ingredientRegistry.values())
      .filter((ingredient) => ingredient.expirationDate.getTime() < Date.now())
      .sort((a, b) => {
        return compareAsc(
          new Date(a.expirationDate).getTime(),
          new Date(b.expirationDate).getTime()
        );
      });
  }

  setColorFilter = (filter: ColorFilter) => {
    this.colortagFilter = { ...filter };
  };

  setStringFilter = (filter: string) => {
    this.termFilter = filter;
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

  loadIngredients = async () => {
    try {
      const ingredients = await agent.Ingredients.list();
      runInAction(() => {
        ingredients.forEach((ingredient) => {
          ingredient.expirationDate = new Date(ingredient.expirationDate);
          ingredient.created = new Date(ingredient.created);
          this.ingredientRegistry.set(ingredient.id, ingredient);
        });
      });
      this.setLoadingInit(false);
    } catch (er) {
      console.log(er);
      this.error = true;
      this.setLoadingInit(false);
    }
  };

  createIngredient = async (ingredient: Ingredient) => {
    this.loading = true;
    ingredient.id = uuid();
    ingredient.expirationDate = new Date(ingredient.expirationDate);
    this.fixDateUTC(ingredient);
    try {
      await agent.Ingredients.create(ingredient);
      runInAction(() => {
        this.ingredientRegistry.set(ingredient.id, ingredient);
        this.editMode = false;
        this.loading = false;
      });
    } catch (er) {
      console.log(er);
      runInAction(() => {
        this.error = true;
        this.loading = false;
      });
    }
  };

  updateIngredient = async (ingredient: Ingredient) => {
    this.loading = true;
    ingredient.expirationDate = new Date(ingredient.expirationDate);
    this.fixDateUTC(ingredient);
    try {
      await agent.Ingredients.update(ingredient);
      runInAction(() => {
        this.ingredientRegistry.set(ingredient.id, ingredient);
        this.editMode = false;
        this.loading = false;
      });
    } catch (er) {
      console.log(er);
      runInAction(() => {
        this.error = true;
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
        this.error = true;
        this.loading = false;
      });
    }
  };

  fixDateUTC = (ingredient: Ingredient) => {
    const now = new Date(Date.now());
    ingredient.expirationDate.setUTCHours(now.getUTCHours());
    ingredient.expirationDate.setUTCMinutes(now.getUTCMinutes());
    ingredient.expirationDate.setUTCSeconds(now.getUTCSeconds());
    ingredient.expirationDate.setUTCMilliseconds(now.getUTCMilliseconds());
    return ingredient;
  };
}
