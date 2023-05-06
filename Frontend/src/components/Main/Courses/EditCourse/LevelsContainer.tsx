import {Box, Button, Card, Divider, Grid, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {useNavigate, useParams} from 'react-router-dom';
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {UnauthorizedPage} from "../../../utils/Hooks/UnathorizedPage";
import {Loader} from "../../../utils/Loader/Loader";
import {ApiProvider} from "../../../../api/BaseResponse";
import {CourseInfo, CourseLevelInfo, getLinkLevelText, getLinkText, getRoleDescription, Roles} from "../utils";
import CourseTitle from "./CourseTitle";

interface LevelsContainerProps {
    courseId?: string;
    userRole?: Roles
}

export const LevelsContainer = ({courseId, userRole}: LevelsContainerProps) => {
    // const routeParams = useParams();
    // const id = routeParams?.id;
    const SBApi = useContext(ApiProvider);
    const [loading, setLoading] = useState(false);
    const [Levels, setLevels] = useState<CourseLevelInfo[] | null>(null);
    // const SBApi = useContext(ApiProvider);
    // const token = useTypeSelector(store => store.authUser.token);
    // const userLoading = useTypeSelector(store => store.authUser.loading);
    // const currentTheme = useTypeSelector(store => store.theme.themeType);

    const navigate = useNavigate();
    useEffect(() => {
        void fetchCourseLevels()
        //Загрузка курса и редактирование уровней
    }, []);

    const fetchCourseLevels = async () => {
        setLoading(true);
        if (courseId) {
            const data = await SBApi.get<CourseLevelInfo[]>(`course/${courseId}/level/all`);
            setLevels(data.data)
            console.log(data);
        }
        // if (data.isOk) {
        //     setCourseInfo(data.data)
        // }
        setLoading(false);
    }

    const addCourse = async () => {
        navigate('/course/' + courseId + "/level/add");
    }

    if (loading) {
        return <Loader text={"Подгружаем информацию по уровням"}/>
    }


    return (
        <Card style={{marginTop: 3}}>
            <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant={"h4"}>Всего уровней: {Levels?.length}</Typography>
                    {
                        <Button
                            onClick={addCourse}
                            sx={{cursor: "pointer"}}
                            variant={"contained"}
                        >
                            {getLinkLevelText(userRole)}
                        </Button>}
                </Box>
                <Divider/>
                {/*{responseStatus?.errors?.length &&*/}
                {/*    <AlertHint text={responseStatus.errors.join(" ")} size={"small"} collapse={Boolean(responseStatus.errors)}*/}
                {/*               severity={"error"}/>}*/}
            </Grid>
        </Card>
    );
};
