import {userAuthAction, userAuthActions, userState} from "../../types/user/user";

const initialUserState: userState = {
    name: '',
    surname: '',
    email: '',
    login: '',
    token: '',
    error: null,
    loading: false,
    isGod: false,
    image: '',
};

export const userAuthReducer = (state = initialUserState, action: userAuthAction): userState => {
    switch (action.type) {
        case userAuthActions.USER_AUTH:
            return {
                loading: true,
                error: null,
                surname: '',
                name: '',
                email: '',
                login: '',
                token: '',
                isGod: false,
                image: '',
            };
        case userAuthActions.USER_AUTH_SUCCESS:
            return {
                loading: false,
                error: null,
                login: action.payload.login,
                name: action.payload.name,
                token: action.payload.token,
                email: action.payload.email,
                surname: action.payload.surname,
                isGod: action.payload.isGod,
                image: action.payload.image,
                id: action.payload.id,
            }
        case userAuthActions.USER_AUTH_ERROR:
            return {
                loading: false,
                error: action.payload,
                surname: '',
                name: '',
                email: '',
                login: '',
                token: '',
                isGod: false,
                image: ''
            }
        case userAuthActions.USER_LOGOUT:
            return {
                loading: false,
                error: null,
                surname: '',
                name: '',
                email: '',
                login: '',
                token: '',
                isGod: false,
                image: ''
            }
        default:
            return state;
    }
};
