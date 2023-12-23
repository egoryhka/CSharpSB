import {Box, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {Loader} from "../../../utils/Loader/Loader";
import {ApiProvider} from "../../../../api/BaseResponse";
import {CourseInfo, extractUserName} from "../utils";
import {CourseTitle} from "./Title/CourseTitle";
import {LevelsContainer} from "./Level/LevelsContainer";
import {delay} from "../../../utils/Delay/Delay";

export default () => {
    const routeParams = useParams();
    const id = routeParams?.id;
    const [loading, setLoading] = useState(false);
    const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
    const SBApi = useContext(ApiProvider);
    const token = useTypeSelector(store => store.authUser.token);
    const userLoading = useTypeSelector(store => store.authUser.loading);
    const currentTheme = useTypeSelector(store => store.theme.themeType);
    const theme = useTypeSelector(store => store.theme.currentTheme);

    const navigate = useNavigate();
    useEffect(() => {
        if (!userLoading) {
            void fetchCourseInfo()
        }
    }, [userLoading]);

    const fetchCourseInfo = async () => {
        setLoading(true);
        do {
            await delay(333);
        } while (loading)
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
        <Box>
            {courseInfo && <CourseTitle {...courseInfo} id={id!}></CourseTitle>}

            <Typography variant="h5" mb={1}>
                Язык: {courseInfo?.language ?? "C#"}
            </Typography>

            <Typography variant="h5" mb={1}>
                Описание курса:
            </Typography>
            <div data-color-mode={currentTheme}>
                <MDEditor.Markdown source={courseInfo?.description}/>
            </div>

            <LevelsContainer courseId={id} userRole={courseInfo?.role} courseName={courseInfo?.name}/>
            <Typography variant="h5" mb={1}>
                {courseInfo?.participantsCount ? `На курс записаны: ${courseInfo?.participantsCount}` : "На курсе пока нет участников"}
            </Typography>
            <Typography variant="h5" mb={1}>
                Создатель: {extractUserName(courseInfo?.owner)}
            </Typography>
            {courseInfo?.owner?.email && <Typography variant="h5" mb={1}>
                По всем вопросам обращайтесь на почту: {courseInfo?.owner?.email}
            </Typography>}
        </Box>
    );
};
