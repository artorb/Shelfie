export interface User {
    name: string;
    token: string;
}

export interface UserForm {
    email: string;
    password: string;
    name?: string;
}