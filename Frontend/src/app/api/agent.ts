import axios, {AxiosResponse} from "axios";
import {IIngredient} from "../models/ingredient";
import {IStorage} from "../models/storage";
import {User, UserForm} from "../models/user";
import {store} from "../stores/store";
import {IStatistic} from "../models/statistics";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = "http://localhost:5000/api/";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
})

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (er) {
        console.log(er);
        return Promise.reject(er);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Ingredients = {
    list: () => requests.get<IIngredient[]>("/ingredients"),
    details: (id: string) => requests.get<IIngredient>(`/ingredients${id}`),
    create: (ingredient: IIngredient) => requests.post<void>(`/ingredients`, ingredient),
    update: (ingredient: IIngredient) =>
        requests.put<void>(`ingredients/${ingredient.id}`, ingredient),
    delete: (id: string) => requests.delete(`ingredients/${id}`),
};

const Storages = {
    list: () => requests.get<IStorage[]>("/storage"),
    details: (id: string) => requests.get<IStorage>(`/storage${id}`),
    create: (storage: IStorage) => requests.post<void>(`/storage`, storage),
    update: (storage: IStorage) =>
        requests.put<void>(`storage/${storage.id}`, storage),
    delete: (id: string) => requests.delete(`storage/${id}`),
};

const Statistics = {
    list: () => requests.get<IStatistic[]>("/statistics")
}


const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserForm) => requests.post<User>('/account/login', user),
    register: (user: UserForm) => requests.post<User>('/account/register', user)
}

const agent = {
    Ingredients,
    Storages,
    Account,
    Statistics,
};

export default agent;
