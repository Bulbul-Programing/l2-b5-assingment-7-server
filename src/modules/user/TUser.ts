export const userRoles = {
    OWNER: 'owner',
    ADMIN: 'admin',
    USER: 'user'
}

export type TUserRole = keyof typeof userRoles;

export type TUser = {
    name: string,
    email: string,
    password?: string,
    role: 'OWNER' | 'ADMIN' | 'USER'
}