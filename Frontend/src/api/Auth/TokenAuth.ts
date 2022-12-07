import axios from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export const TokenAuth = async (token: string) => {
    const {data} = await axios.get(requestUrl + `api/Auth`, {headers: {Authorization: token}});
    return data;
}

