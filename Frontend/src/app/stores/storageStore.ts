import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {IStorage} from "../models/storage";
import {v4 as uuid} from "uuid";
import {store} from "./store";

export default class StorageStore {
    storageRegistry = new Map<string, IStorage>();
    selectedStorage: IStorage | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInit = true;

    constructor() {
        makeAutoObservable(this);
    }

    get getStorages() {
        return Array.from(this.storageRegistry.values());
    }

    filterByName = (text: string) => {
        return Array.from(this.storageRegistry.values()).filter(storage => storage.name.indexOf(text) > -1);
    }

    loadStorages = async () => {
        try {
            const storages = await agent.Storages.list();
            runInAction(() => {
                storages.forEach((storage) => {
                    storage.created = new Date(storage.created);
                    this.storageRegistry.set(storage.id, storage);
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

    createStorage = async (storage: IStorage) => {
        this.loading = true;
        storage.id = uuid();
        try {
            await agent.Storages.create(storage);
            runInAction(() => {
                this.storageRegistry.set(storage.id, storage);
                this.selectedStorage = storage;
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

    updateStorage = async (storage: IStorage) => {
        this.loading = true;
        try {
            await agent.Storages.update(storage);
            runInAction(() => {
                this.storageRegistry.set(storage.id, storage);
                this.selectedStorage = storage;
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
                this.loading = false;
            });
        }
    };
}
