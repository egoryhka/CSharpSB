import axios from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export const sendErrorToServer = (error: Error) => {
    axios.post<boolean>(requestUrl + `api/error`, {exceptionText: error})
};
