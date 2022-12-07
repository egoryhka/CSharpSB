export enum userAuthActions {
    USER_AUTH = 'USER_AUTH',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_ERROR = 'USER_AUTH_ERROR',
    USER_LOGOUT = 'USER_LOGOUT'
}

export interface userState {
    firstName: string;
    lastName: string;
    image: string;
    login: string;
    email: string;
    token: null | string;
    error: null | string;
    loading: boolean;
    isGod: boolean;
}

export type fetchedUser = {
    login: string;
    firstName: string;
    lastName: string;
    image: string;
    token: string;
    email: string;
    isGod: boolean;
    ok: boolean;
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


