import {Autocomplete, Box, Button, Card, TextField, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {Link, Navigate, useParams} from 'react-router-dom';
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {UnauthorizedPage} from "../../../utils/Hooks/UnathorizedPage";
import {Loader} from "../../../utils/Loader/Loader";
import {ApiProvider} from "../../../../api/BaseResponse";
import {UserInfo} from "os";

interface CourseInfo {
    admins: any[]
    description: string;
    name: string;
    ownerId: any
    users: any[]
}

export default () => {
    const routeParams = useParams();
    const id = routeParams?.id;
    console.log(id);
    const [loading, setLoading] = useState(false);
    const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
    const SBApi = useContext(ApiProvider);
    const token = useTypeSelector(store => store.authUser.token);

    useEffect(() => {
        void fetchCourseInfo()
        //Загрузка курса и редактирование уровней
    }, []);

    const fetchCourseInfo = async () => {
        console.log(id);
        const data = await SBApi.withAuthorization(token as string).get<CourseInfo>(`course/${id}`);
        if (data.isOk) {
            setCourseInfo(data.data)
        }
        console.log("data", data)
    }

    if (loading) {
        return <Loader text={"Подгружаем информацию по курсу"} />
    }

    return (
        <UnauthorizedPage>
            <Box>
                <Typography variant="h5" mb={1}>
                    Курс:
                </Typography>

                <Typography variant="h5" mb={1}>
                    Язык:
                </Typography>

                <div data-color-mode="light">
                    <MDEditor.Markdown source={"description"}/>
                </div>
            </Box>
        </UnauthorizedPage>

    );
};
