import React, {useContext, useEffect, useState} from 'react';

import {CoursePageView} from "./CoursePageView";
import {Loader} from "../../../utils/Loader/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {ApiProvider} from "../../../../api/BaseResponse";
import {ICourse} from "../../../../api/ConferenceTimeLine/getConferencesTimeLine";

const CoursePage = () => {
    const [loading, setLoading] = useState<boolean>();
    const [courseData, setCourseData] = useState<ICourse>();
    const routeParams = useParams();
    const navigate = useNavigate();

    const SBApi = useContext(ApiProvider);

    const getCourseInfo = async () => {
        const id = routeParams.courseId;
        if (id) {
            setLoading(true);
            const response = await SBApi.get<ICourse>(`course/${id}`);
            if (response.isOk) {
                setCourseData(response.data);
                setLoading(false);
            }
        } else {
            navigate("/notfound");
        }
    }

    useEffect(() => {
        getCourseInfo();
    }, []);

    return loading
        ? <Loader text={"Подгружаем информацию по курсу..."}/>
        : <CoursePageView course={courseData}/>
};

export default CoursePage;
