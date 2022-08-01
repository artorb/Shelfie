import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Storage } from "../../models/storage";
import { v4 as uuid } from "uuid";
import { compareAsc } from "date-fns";

export class StorageStore {
  storageRegistry = new Map<string, Storage>();
  selectedStorage: Storage | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInit = true;
  error = false;

  constructor() {
    makeAutoObservable(this);
  }

  get storagesByDate() {
    const storages = Array.from(this.storageRegistry.values()).sort((a, b) => {
      return compareAsc(
        new Date(a.created).getTime(),
        new Date(b.created).getTime()
      );
    });

    return storages;
  }

  loadStorages = async () => {
    try {
      const storages = await agent.Storages.list();
      runInAction(() => {
        storages.forEach((storage) => {
          storage.created = new Date(storage.created);
          this.storageRegistry.set(storage.id, storage);
        });
      });
      this.setLoadingInit(false);
    } catch (er) {
      console.log(er);
      this.error = true;
      this.setLoadingInit(false);
    }
  };

  setLoadingInit = (state: boolean) => {
    this.loadingInit = state;
  };

  selectStorage = (id: string) => {
    this.selectedStorage = this.storageRegistry.get(id);
  };

  cancelSelectedStorage = () => {
    this.selectedStorage = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectStorage(id) : this.cancelSelectedStorage();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createStorage = async (storage: Storage) => {
    this.loading = true;
    storage.id = uuid();
    try {
      await agent.Storages.create(storage);
      runInAction(() => {
        this.storageRegistry.set(storage.id, storage);
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

  updateStorage = async (storage: Storage) => {
    this.loading = true;
    try {
      await agent.Storages.update(storage);
      runInAction(() => {
        this.storageRegistry.set(storage.id, storage);
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

  deleteStorage = async (id: string) => {
    this.loading = true;
    try {
      await agent.Storages.delete(id);
      runInAction(() => {
        this.storageRegistry.delete(id);
        if (this.selectedStorage?.id === id) {
          this.cancelSelectedStorage();
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
}
