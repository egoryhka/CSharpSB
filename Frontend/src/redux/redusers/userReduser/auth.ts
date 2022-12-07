import {userAuthAction, userAuthActions, userState} from "../../types/user/user";

const initialUserState: userState = {
    firstName: '',
    lastName: '',
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
                lastName: '',
                firstName: '',
                email: '',
                login: '',
                token: '',
                isGod: false,
                image: ''
            };
        case userAuthActions.USER_AUTH_SUCCESS:
            return {
                loading: false,
                error: null,
                login: action.payload.login,
                firstName: action.payload.firstName,
                token: action.payload.token,
                email: action.payload.email,
                lastName: action.payload.lastName,
                isGod: action.payload.isGod,
                image: action.payload.image,
            }
        case userAuthActions.USER_AUTH_ERROR:
            return {
                loading: false,
                error: action.payload,
                lastName: '',
                firstName: '',
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
                lastName: '',
                firstName: '',
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
