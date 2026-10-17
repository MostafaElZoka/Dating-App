export interface User {
    id: string,
    token: string,
    displayName: string,
    imgUrl?: string,
}

export interface LoginCreds{
    email: string,
    password: string
}

export interface RegisterCreds{
    email: string,
    displayName: string,
    password: string
}
