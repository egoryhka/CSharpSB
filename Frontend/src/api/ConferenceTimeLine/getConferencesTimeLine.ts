import axios from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";
import {useEffect, useState} from "react";

export interface IConferenceTimeLine {
    name: string;
    link: string;
    start: Date;
    end: Date;
}

export const useFetchTimeLineConfs = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [timeLine, setTimeLine] = useState<IConferenceTimeLine[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getTimeLine = async () => {
            setLoading(true);
            try {
                const data = await getConferenceTimeLine();
                setTimeLine(data);
            } catch (e) {
                setError("Произошла ошибка при занрузки таймлайна")
            }
            setLoading(false);
        }

        void getTimeLine();
    }, [])

    return {loading, error, timeLine};
}

const getConferenceTimeLine = async () => {
    const {data} = await axios.get<IConferenceTimeLine[]>(requestUrl + `api/Conference/getcalendar`);
    return data;
}
