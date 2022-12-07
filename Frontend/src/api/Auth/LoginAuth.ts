import axios from "axios";

import requestUrl from "../BaseUrl/CreateBaseUrl";

export interface IUserAuth {
    login: string;
    password: string;
}

export const AuthRequest = async (userData: IUserAuth) => {
    const data = await axios.post(requestUrl + `api/v1/auth`, userData);
    return data;
}
