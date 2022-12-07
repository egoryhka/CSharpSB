import axios from "axios";
import {IResponceStatuses} from "../../components/utils/ResponceStatuses/ReaponceIntertface";
import requestUrl from "../BaseUrl/CreateBaseUrl";

interface IReport {
    userName: string;
    userId: string;
    userLogo: string;
    reportName: string;
    description: string;
    doclink: string;
}

export interface IReportStatus {
    expertName: string;
    expertId: string;
    expertLogo: string;
    feedback: string;
    status: string;
    date: Date;
    docLink: string;
}

export interface ReportInfo extends IResponceStatuses{
    reports: IReport[];
    statuses: IReportStatus[];
}

export const getReportInfoRequest = async (confId: string) => {
    const {data} = await axios.get<ReportInfo>(requestUrl + `api/conference/getreportsinfo/${confId}`);
    return data;
}

export const removeReportRequest = async (confId: string) => {
    const {data} = await axios.get<IResponceStatuses>(`api/conference/deletereport/${confId}`);
    return data;
}

export const sendReport = async (reportData: FormData) => {
    const {data} = await axios.post<IResponceStatuses>(`api/conference/addreport`, reportData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}
