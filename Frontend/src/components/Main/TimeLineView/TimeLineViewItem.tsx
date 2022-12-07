import {IConferenceTimeLine} from "../../../api/ConferenceTimeLine/getConferencesTimeLine";
import {Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {day, getBGColors} from "./utils";


export const TimeLineViewItem = ({link, end, start, name}: IConferenceTimeLine) => {
    const dateNow = new Date();
    const lineStart = new Date(start);
    const lineEnd = new Date(end);
    const BGColor = getBGColors(1).pop();
    let startPosition = 0;
    if (lineStart > dateNow) {
        startPosition = Math.trunc((lineStart.getTime() - dateNow.getTime()) / day);
    }
    let endPosition = Math.trunc((lineEnd.getTime() - dateNow.getTime()) / day);
    endPosition = Math.min(endPosition, 30);
    const gridStartLength = startPosition;
    const gridEndLength = 30 - endPosition;
    return (<>
        <Grid xs={gridStartLength}/>
        <Grid component={Link} replace to={link} item xs={endPosition - startPosition}
              bgcolor={BGColor} sx={{height: 80, opacity: .8, borderRadius: 5, padding: 1}}>
            <Typography>{name}</Typography>
        </Grid>
        <Grid xs={gridEndLength}/>
    </>)
}

