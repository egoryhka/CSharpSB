import {INewConferenceData} from "../../../api/ConferenceActions/Create";

export const createConferenceDataWrapper = (name: string, description: string, password: string, logo: File | null | FormDataEntryValue): INewConferenceData => {
    return {
        name, password, description, logo
    };
}
