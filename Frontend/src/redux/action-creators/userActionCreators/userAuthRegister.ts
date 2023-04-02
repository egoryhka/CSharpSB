import {Dispatch} from "redux";
import {userAuthAction, userAuthActions} from "../../types/user/user";
import axios from "axios";
import {AuthRequest} from "../../../api/Auth/LoginAuth";
import {TokenAuth} from "../../../api/Auth/TokenAuth";
import {Logout} from "../../../api/Auth/Logout";

import requestUrl from "../../../api/BaseUrl/CreateBaseUrl";

export const userAuth = (login: string, password: string, save: boolean = true) => {
    return async function (dispatch: Dispatch<userAuthAction>) {
        try {
            dispatch({type: userAuthActions.USER_AUTH});
            const {data} = await AuthRequest({login, password});

            if (data.login) {
                if (save) {
                    localStorage.setItem('token', data.token);
                }
                dispatch({type: userAuthActions.USER_AUTH_SUCCESS, payload: data});
            } else {
                dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: "Неверный логин или пароль"});
            }
        } catch (e) {
            dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: 'Сервер не отвечает'});
        }
    };
};

export const tokenUserAuth = (token: string) => {
    return async function (dispatch: Dispatch<userAuthAction>) {
        try {
            dispatch({type: userAuthActions.USER_AUTH});
            const data = await TokenAuth(token);
            if (data.login) {
                dispatch({type: userAuthActions.USER_AUTH_SUCCESS, payload: data});
            } else {
                dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: "Неверный логин или пароль"});
            }

        } catch (e) {
            dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: 'Сервер не отвечает'});
        }
    };
};

export const userLogout = () => {
    return async function (dispatch: Dispatch<userAuthAction>) {
        localStorage.removeItem('token');
        await Logout()
        dispatch({type: userAuthActions.USER_LOGOUT});
    }
}

type regData = {
    login: string;
    password: string;
    email: string
    name: string;
    surname: string;
}

export const userRegister = async (userRegData: regData) => {
    try {
        const {data} = await axios.post(requestUrl + `api/Registration`, userRegData);
        return data;
    } catch (e) {
        return 'Сервер не отвечает';
    }
};
