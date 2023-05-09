import {Box, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {Loader} from "../../../utils/Loader/Loader";
import {ApiProvider} from "../../../../api/BaseResponse";
import {CourseInfo} from "../utils";
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
        void fetchCourseInfo()
        //Загрузка курса и редактирование уровней
    }, []);

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
        // <UnauthorizedPage>
        <Box>
            {courseInfo && <CourseTitle {...courseInfo} id={id!}></CourseTitle>}

            <Typography variant="h5" mb={1}>
                Язык: {courseInfo?.language ?? "C#"}
            </Typography>

            <Typography variant="h5" mb={1}>
                Создатель: {courseInfo?.owner ?? "Мусор"}
            </Typography>

            <div data-color-mode={currentTheme}>
                <MDEditor.Markdown source={courseInfo?.description}/>
            </div>

            <LevelsContainer courseId={id} userRole={courseInfo?.role} courseName={courseInfo?.name}/>

            {courseInfo?.participants?.length ?
                <Typography variant="h5" mb={1}>
                    Уже участвуют:
                    <br/>
                    {courseInfo?.participants.map(u => <Link style={{color: theme.palette.text.primary}}
                                                             key={u.id}
                                                             to={`/userprofile/${u.id}`}>{u.name + " " + u.surname}</Link>)}
                </Typography>
                :
                <Typography variant="h5" mb={1}>
                    На курсе пока нет участников
                </Typography>
            }
        </Box>
        // </UnauthorizedPage>
    );
};
