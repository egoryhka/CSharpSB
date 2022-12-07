import axios from "axios";
import {ConferenceInfo} from "../../redux/types/conferencies/conference";
import {useEffect, useState} from "react";
import requestUrl from "../BaseUrl/CreateBaseUrl";

interface IFetchedConfs {
    confs: ConferenceInfo[];
    isOk: boolean;
    errorMessage: string;
    totalCount: number;
    countInPage: number;
}

export const useFetchUsersConfs = (email: string, currentPage: number) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conferences, setConferences] = useState<ConferenceInfo[]>([]);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalConfs, setTotalConfs] = useState<number>(0);

    const getUsersConf = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get<IFetchedConfs>(requestUrl + `api/Conference/getconfs?useremail=${email}&page=${currentPage}`);
            if (data.isOk) {
                setConferences(data.confs);
                setTotalPages(Math.ceil(data.totalCount / data.countInPage));
                setTotalConfs(data.totalCount);
            } else {
                setMessage(data.errorMessage)
            }
        } catch (e) {
            setLoading(false);
            setError("Ошибка загрузки");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsersConf();
    }, [currentPage])
    return {loading, conferences, error, message, totalPages, totalConfs};
}
