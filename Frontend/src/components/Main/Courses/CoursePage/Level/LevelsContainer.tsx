import {CourseLevelInfo, getLinkLevelText, Roles} from "../../utils";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {Loader} from "../../../../utils/Loader/Loader";
import {Box, Button, Card, Divider, Grid, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Level} from "./Level";


interface LevelsContainerProps {
    courseId?: string;
    userRole?: Roles
    courseName?: string
}

export const LevelsContainer = ({courseId, userRole, courseName}: LevelsContainerProps) => {
    const SBApi = useContext(ApiProvider);
    const [loading, setLoading] = useState(false);
    const [levels, setLevels] = useState<CourseLevelInfo[] | null>(null);

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
        navigate('/course/' + courseId + "/level/add", {
            state: {
                authorized: true,
                courseId: courseId,
                courseName: courseName
            }
        });
    }

    if (loading) {
        return <Loader text={"Подгружаем информацию по уровням"}/>
    }

    const buttonText = getLinkLevelText(userRole);


    return (
        <Card sx={{marginTop: 4}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"}>Всего уровней: {levels?.length}</Typography>
                {buttonText &&
                    <Button
                        onClick={addCourse}
                        sx={{cursor: "pointer"}}
                        variant={"contained"}
                    >
                        {buttonText}
                    </Button>}
            </Box>
            <Divider/>
            <Grid container lg={12} xs={12} sx={{marginTop: 1}}>
                {levels?.length && levels.map(level => <Level key={level.id} {...level} courseId={courseId}/>)}
            </Grid>
        </Card>
    );
};
