import {Box, Button, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {useNavigate, useParams} from 'react-router-dom';
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {UnauthorizedPage} from "../../../utils/Hooks/UnathorizedPage";
import {Loader} from "../../../utils/Loader/Loader";
import {ApiProvider} from "../../../../api/BaseResponse";
import {CourseInfo, getRoleDescription, Roles} from "../utils";
import CourseTitle from "./CourseTitle";
import {LevelsContainer} from "./LevelsContainer";

export default () => {
    const routeParams = useParams();
    const id = routeParams?.id;
    const [loading, setLoading] = useState(false);
    const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
    const SBApi = useContext(ApiProvider);
    const token = useTypeSelector(store => store.authUser.token);
    const userLoading = useTypeSelector(store => store.authUser.loading);
    const currentTheme = useTypeSelector(store => store.theme.themeType);

    const navigate = useNavigate();
    useEffect(() => {
        void fetchCourseInfo()
        //Загрузка курса и редактирование уровней
    }, []);

    const fetchCourseInfo = async () => {
        setLoading(true);
        const data = await SBApi.withAuthorization(token as string).get<CourseInfo>(`course/${id}`);
        if (data.isOk) {
            setCourseInfo(data.data)
        }
        setLoading(false);
    }

    if (loading || userLoading) {
        return <Loader text={"Подгружаем информацию по курсу"}/>
    }

    return (
        // <UnauthorizedPage>
        <Box>
            <CourseTitle id={id} title={courseInfo?.name} userRoles={courseInfo?.role}></CourseTitle>

            <Typography variant="h5" mb={1}>
                Язык: {courseInfo?.lang ?? "C#"}
            </Typography>

            <Typography variant="h5" mb={1}>
                Создатель: {courseInfo?.owner ?? "Мусор"}
            </Typography>

            <div data-color-mode={currentTheme}>
                <MDEditor.Markdown source={courseInfo?.description}/>
            </div>

            <LevelsContainer courseId={id} userRole={courseInfo?.role}/>

            <Typography variant="h5" mb={1}>
                Уже участвуют: {JSON.stringify(courseInfo?.participants)}
            </Typography>
        </Box>
        // </UnauthorizedPage>
    );
};
