import axios from "axios";
import {IResponceStatuses} from "../../components/utils/ResponceStatuses/ReaponceIntertface";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export const leaveConference = async (confId: string) => {
    const {data} = await axios.get<IResponceStatuses>(requestUrl + `api/conference/leave/${confId}`);
    return data;
}
