export const userRoles = {
    OWNER: 'owner',
    ADMIN: 'admin',
    USER: 'user'
}

export type TUserRole = keyof typeof userRoles;

export type TUser = {
    id: number,
    name: string,
    email: string,
    password?: string,
    role: 'OWNER' | 'ADMIN' | 'USER'
}