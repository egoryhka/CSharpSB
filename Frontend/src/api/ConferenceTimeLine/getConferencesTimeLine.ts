import axios from "axios";
import requestUrl from "../BaseUrl/CreateBaseUrl";
import {useContext, useEffect, useState} from "react";
import {ApiProvider} from "../BaseResponse";

interface ICourseParticipants {
    name: string;
    id: string;
    logo: string;
}

export interface ICourse {
    id: number
    name: string
    description?: string
    users: ICourseParticipants[];
}

export const useFetchCourses = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [error, setError] = useState<string>("");
    const [isOk, setIsOk] = useState<boolean>(false);
    const SBApi = useContext(ApiProvider);

    useEffect(() => {
        const getTimeLine = async () => {
            setLoading(true);
            try {
                const response = await SBApi.get<ICourse[]>("course/all");
                setCourses(response.data);
                setIsOk(response.isOk);
            } catch (e) {
                setError("Произошла ошибка при занрузки курсов. Попробуйте позже или обратитесь в техподдержку")
            }
            setLoading(false);
        }

        void getTimeLine();
    }, [])

    return {loading, error, courses, isOk};
}
