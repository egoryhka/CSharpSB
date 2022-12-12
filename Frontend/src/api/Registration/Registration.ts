import axios, {AxiosInstance, AxiosRequestConfig, Method} from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";
import {BaseResponse} from "../BaseResponse";

export interface IUserPassword {
    password: string;
    login: string;
}

export const registrationRequest = async (userData: IUserPassword) => {
    const { data } = await axios.post<BaseResponse>(requestUrl + `account/register`, userData);
    return data;
}
