import axios from "axios";
import {ConfData} from "./getConferencePage";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export const AcceptInviteLink = async (email: string, password: string | null) => {
    const {data} = await axios.post<ConfData>(requestUrl + `Accept/AccessLink`,  {email, password});
    return data;
}
