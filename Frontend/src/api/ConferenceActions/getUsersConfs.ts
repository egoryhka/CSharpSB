import {useContext, useEffect, useState} from "react";
import {ApiProvider} from "../BaseResponse";
import {Roles} from "../../components/Main/Courses/utils";

export interface UserCourses {
    totalCount: number;
    totalPages: number;
    countInPage: number;
    courses: IFetchedCourses[];
}


export interface IFetchedCourses {
    startDate: string;
    role: Roles;
    name: string;
    courseId: number;
    levelsComplete: number;
    levelCount: number;
}

export const useFetchUsersConfs = (page: number, id: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<IFetchedCourses[]>([]);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalConfs, setTotalConfs] = useState<number>(0);

    const SBApi = useContext(ApiProvider);

    const getUsersConf = async () => {
        try {
            setLoading(true);
            const data = await SBApi.get<UserCourses>(`course/user/${id}/all`, {params: {page}});
            if (data.isOk) {
                setCourses(data.data.courses);
                setTotalConfs(data.data.totalCount);
                setTotalPages(data.data.totalPages);
                // setTotalConfs(data.totalCount);
            } else {
                setMessage(data.fullError)
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
    }, [page])
    return {loading, courses, error, message, totalPages, totalConfs};
}
