import axios from "axios";
import {IParticipant} from "../../redux/types/conferencies/conference";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export interface ConfData {
    name: string;
    isFounded: boolean;
    errorMessage: string;
    isOk: boolean;
    logo: string;
    isOwner: boolean;
    offlineConnectionPlacement: string;
    description: string;
    startDate: string;
    endDate: string;
    members: participantsTypes;
    onlineConnectionLink: string;
    roles: string;
    inviteLink?: string;
    pageLink: string;
}

export interface participantsTypes {
    admins: IParticipant[];
    moderators: IParticipant[];
    speakers: IParticipant[];
    listeners: IParticipant[];
    listenersCount: number;
    totalUsers: number;
    owner: IParticipant;
}

export const getConferencePage = async (id: string, token: string | null) => {
    const {data} = await axios.get<ConfData>(requestUrl + `api/Conference/getconf/${id}`,  {headers: {Authorization: token}});
    return data;
}

export const getShortConferenceInfo = async (id: string) => {
    const {data} = await axios.get<ConfData>(requestUrl + `api/Conference/getshortconf/${id}`);
    return data;
}
