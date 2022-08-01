import { makeAutoObservable, runInAction } from "mobx";
import browserHistory from "../../../browserHistory";
import agent from "../../api/agent";
import { User, UserForm } from "../../models/user";
import { store } from "../store";

export class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  login = async (crds: UserForm) => {
    try {
      const user = await agent.Account.login(crds);

      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));

      browserHistory.push("/dashboard");
    } catch (err) {
      throw new Error(err);
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    browserHistory.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (err) {
      console.log(err);
    }
  };

  register = async (crds: UserForm) => {
    try {
      const user = await agent.Account.register(crds);

      store.commonStore.setToken(user.token);
      browserHistory.push("/dashboard");
      store.modalStore.closeModal();
    } catch (err) {
      throw new Error(err);
    }
  };
}
