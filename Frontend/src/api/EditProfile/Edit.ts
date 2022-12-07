import axios from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";

interface IEditProfileLogin {
    login: string
}

interface IEditProfilePassword {
    oldPassword: string
    newPassword: string
}

interface IEditProfileInfo {
    firstName: string
    LastName: string
    email: string
    login: string
    image: File | null | FormDataEntryValue;
}

export const editProfileInfo = async (userData: FormData) => {
    const {data} = await axios.post<boolean>(requestUrl + `api/EditProfile/Info`, userData);
    return data;
}

export const editProfilePassword = async (userData: IEditProfilePassword) => {
    const {data} = await axios.post<boolean>(requestUrl + `api/EditProfile/password`, userData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}
