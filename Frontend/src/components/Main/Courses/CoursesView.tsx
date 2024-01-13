import {Box, Card, Grid, Typography} from '@mui/material';
import React from 'react';
import {ICourse} from "../../../api/ConferenceTimeLine/getConferencesTimeLine";
import {dateAfterMonthConst} from "./utils";
import {CourseViewItem} from "./CourseViewItem";

interface CoursesViewProps {
    courses: ICourse[];
}

export const CoursesView = ({courses}: CoursesViewProps) => {
    const dateAfterMonth = dateAfterMonthConst.toLocaleDateString();
    const dateNow = new Date();
    return (
        <Card sx={{padding: 3}}>
            <Typography component="h2" variant="h5">Список курсов:</Typography>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography>{dateNow.toLocaleDateString()}</Typography>
            </Box>
            <Grid container columns={30} rowGap={1}>
                {courses.map(CourseViewItem)}
            </Grid>
        </Card>
    );
};


