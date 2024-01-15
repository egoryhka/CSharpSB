import React from 'react';
import {
    useFetchCourses
} from "../../api/ConferenceTimeLine/getConferencesTimeLine";
import {Loader} from "../utils/Loader/Loader";
import AlertHint from "../utils/Alert/AlertHint";
import {CoursesView} from "./Courses/CoursesView";
import {Typography} from "@mui/material";

export const HomePage = () => {
    const {courses, loading, error, isOk} = useFetchCourses();
    return (
        <div>
            <Typography variant={"h4"} component={"h5"}>Сервис SbSharp - призван помочь людям изучать языки
                программирования. Пока только C#, остальное в будущий версиях</Typography>
            {loading ? <Loader text={"Загружаем курсы"}/> : null}
            <AlertHint
                collapse={Boolean(error)}
                text={error}
                size={"small"}
                severity={"error"}/>
            {courses?.length > 0 && <CoursesView courses={courses}/>}
            {(courses?.length === 0 && isOk) && <AlertHint
                collapse={isOk}
                text={"Курсы не найдены. Попробуйте позже"}
                size={"small"}
                severity={"info"}/>}
        </div>
    );
};


