import axios, { AxiosResponse } from "axios";
import { Ingredient } from "../models/ingredient";
import { Storage } from "../models/storage";
import { User, UserForm } from "../models/user";
import { store } from "../stores/store";
import { Statistic } from "../models/statistics";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api/";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(300);
    return response;
  } catch (er) {
    console.log(er);
    return Promise.reject(er);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Ingredients = {
  list: () => requests.get<Ingredient[]>("/ingredients"),
  details: (id: string) => requests.get<Ingredient>(`/ingredients${id}`),
  create: (ingredient: Ingredient) =>
    requests.post<void>(`/ingredients`, ingredient),
  update: (ingredient: Ingredient) =>
    requests.put<void>(`ingredients/${ingredient.id}`, ingredient),
  delete: (id: string) => requests.delete(`ingredients/${id}`),
};

const Storages = {
  list: () => requests.get<Storage[]>("/storage"),
  details: (id: string) => requests.get<Storage>(`/storage${id}`),
  create: (storage: Storage) => requests.post<void>(`/storage`, storage),
  update: (storage: Storage) =>
    requests.put<void>(`storage/${storage.id}`, storage),
  delete: (id: string) => requests.delete(`storage/${id}`),
};

const Statistics = {
  list: () => requests.get<Statistic[]>("/statistics"),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserForm) => requests.post<User>("/account/login", user),
  register: (user: UserForm) => requests.post<User>("/account/register", user),
};

const agent = {
  Ingredients,
  Storages,
  Account,
  Statistics,
  requests,
};

export default agent;
