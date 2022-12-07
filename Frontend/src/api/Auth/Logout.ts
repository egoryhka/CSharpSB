import axios from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export const Logout = async () => {
    await axios.get(requestUrl + 'api/Logout');
}

