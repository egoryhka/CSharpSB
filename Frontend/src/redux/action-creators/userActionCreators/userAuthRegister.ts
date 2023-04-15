import {Dispatch} from "redux";
import {fetchedUser, userAuthAction, userAuthActions, userState} from "../../types/user/user";
import axios from "axios";
import {AuthRequest} from "../../../api/Auth/LoginAuth";
import {TokenAuth} from "../../../api/Auth/TokenAuth";
import {Logout} from "../../../api/Auth/Logout";

import requestUrl from "../../../api/BaseUrl/CreateBaseUrl";
import {ThunkAction} from "redux-thunk";
import {SBAPIInitial} from "../../../api/BaseResponse";

export const userAuth = (login: string, password: string, save: boolean = true) => {
    return async function (dispatch: Dispatch<userAuthAction>, _: any, {SBApi}: {SBApi: typeof SBAPIInitial}) {
        try {
            dispatch({type: userAuthActions.USER_AUTH});
            const response = await SBApi.post<fetchedUser>("account/login", {data: {password, login}});
            const {data} = response;
            console.log(response)
            if (response.isOk) {
                if (save) {
                    localStorage.setItem('token', data.token ?? "");
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
    return async function (dispatch: Dispatch<userAuthAction>, _: any, {SBApi}: {SBApi: typeof SBAPIInitial}) {
        try {
            dispatch({type: userAuthActions.USER_AUTH});
            const response = await SBApi.get<fetchedUser>("account/login", {headers: {Authorization: token}});
            const {data} = response;
            if (response.isOk) {
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
    return async function (dispatch: Dispatch<userAuthAction>, _: any, {SBApi}: {SBApi: typeof SBAPIInitial}) {
        const token = _().authUser.token;
        localStorage.removeItem('token');
        await SBApi.get("account/logout", {headers: {Authorization: `Bearer ${token}`}});
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
