import axios from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export interface INewConferenceData {
    name: string;
    description: string;
    password: string;
    logo: File | null | FormDataEntryValue;
}

export interface CreateConfResponce {
    isOk: boolean;
    editLink: string;
    errorMessage: string;
}

export const createNewConferenceRequest = async (newConferenceData: FormData) => {
    const {data} = await axios.post<CreateConfResponce>(requestUrl + `api/Conference/create`, newConferenceData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}
