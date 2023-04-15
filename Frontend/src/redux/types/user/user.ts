export enum userAuthActions {
    USER_AUTH = 'USER_AUTH',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_ERROR = 'USER_AUTH_ERROR',
    USER_LOGOUT = 'USER_LOGOUT'
}

export interface userState {
    name: string;
    id?: string;
    surname: string;
    image: string;
    login: string;
    email: string;
    token: null | string;
    error: null | string;
    loading: boolean;
    isGod: boolean;
}

//TODO типизировать ебанный рот его
export type UserCourse = {

}

export type fetchedUser = {
    login: string;
    name: string;
    surname: string;
    image: string;
    token: string;
    email: string;
    id?: string;
    isGod: boolean;
    ok: boolean;
    role: 0 | 1 | 2;
    courses: UserCourse[];
}

export type userAuthAction = authUserAction | authUserSuccessAction | authUserErrorAction | logoutUserAction

interface authUserAction {
    type: userAuthActions.USER_AUTH;
}

interface logoutUserAction {
    type: userAuthActions.USER_LOGOUT;
}

interface authUserSuccessAction {
    type: userAuthActions.USER_AUTH_SUCCESS;
    payload: fetchedUser;
}

interface authUserErrorAction {
    type: userAuthActions.USER_AUTH_ERROR;
    payload: string
}


