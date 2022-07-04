import {makeAutoObservable} from "mobx";

export default class DarkClass {
    isDark: boolean = (window.localStorage.getItem('darkMode') === 'true');

    setDark = (value: boolean) => {
        if (value)
            window.localStorage.setItem('darkMode', 'true');
        else
            window.localStorage.setItem('darkMode', 'false');
        this.isDark = value;
    }

    get darkStatus() {
        return this.isDark;
    }

    toggleDark = () => {
        const value = window.localStorage.getItem('darkMode') === 'false';
        window.localStorage.setItem('darkMode', (value === true) ? 'true' : 'false');
    }

    constructor() {
        makeAutoObservable(this);
    }
}

