import axios from "axios";
import {IResponceStatuses} from "../../components/utils/ResponceStatuses/ReaponceIntertface";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export const joinConference = async (confId: string) => {
    const {data} = await axios.get<IResponceStatuses>(requestUrl + `api/conference/join/${confId}`);
    return data;
}
