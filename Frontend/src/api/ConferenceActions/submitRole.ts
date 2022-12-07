import axios from "axios";
import {IResponceStatuses} from "../../components/utils/ResponceStatuses/ReaponceIntertface";
import requestUrl from "../BaseUrl/CreateBaseUrl";

interface setRole {
    userId: number;
    confId: string;
    role: string;
}

export const setUserRole = async (setrole: setRole) => {
    const {data} = await axios.post<IResponceStatuses>(requestUrl + `api/conference/setrole`, setrole);
    return data;
}
