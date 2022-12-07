import {Box, Card, Grid, Typography} from '@mui/material';
import React from 'react';
import {IConferenceTimeLine} from "../../../api/ConferenceTimeLine/getConferencesTimeLine";
import {dateAfterMonthConst} from "./utils";
import {TimeLineViewItem} from "./TimeLineViewItem";

interface TimeLineViewProps {
    timeLine: IConferenceTimeLine[];
}

export const TimeLineView = ({timeLine}: TimeLineViewProps) => {
    const dateAfterMonth = dateAfterMonthConst.toLocaleDateString();
    const dateNow = new Date();
    return (
        <Card sx={{padding: 3}}>
            <Typography component="h2" variant="h5">Тайм-лайн текущих и ближайших конференций:</Typography>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography>{dateNow.toLocaleDateString()}</Typography>
                <Typography>{dateAfterMonth}</Typography>
            </Box>
            <Grid container columns={30} rowGap={1}>
                {timeLine.map(TimeLineViewItem)}
            </Grid>
        </Card>
    );
};


