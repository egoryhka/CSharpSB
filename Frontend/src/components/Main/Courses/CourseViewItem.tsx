import {Avatar, AvatarGroup, Box, Grid, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {day, getBGColors} from "./utils";
import {ICourse} from "../../../api/ConferenceTimeLine/getConferencesTimeLine";
import {Block} from "@mui/icons-material";
import {CustomTooltip} from "../../utils/CustomTooltip/CustomTooltip";
import {stringToColor} from "../../utils/StringToColor/StringToColor";

interface CoursesViewProps {
    course: ICourse;
}

export const CourseViewItem = ({name, id, users, description}: ICourse) => {
    const dateNow = new Date();
    // const lineStart = new Date(start);
    // const lineEnd = new Date(end);
    const BGColor = getBGColors(1).pop();
    let startPosition = 0;
    // if (lineStart > dateNow) {
    //     startPosition = Math.trunc((lineStart.getTime() - dateNow.getTime()) / day);
    // }
    // let endPosition = Math.trunc((lineEnd.getTime() - dateNow.getTime()) / day);
    // endPosition = Math.min(endPosition, 30);
    // const gridStartLength = startPosition;
    // const gridEndLength = 30 - endPosition;
    return (
        <Grid key={id} component={Link} replace to={`course/${id}`} item
              bgcolor={BGColor} sx={{width: "100%", height: 80, opacity: .8, borderRadius: 5, padding: 1}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Grid>
                    <Typography variant={"h5"}>{name}</Typography>
                    <Typography variant={"body1"}>{description}</Typography>
                </Grid>
                <AvatarGroup total={users.length ?? 0}>
                    {users.map(user =>
                        <Avatar>
                            <CustomTooltip text={user.name}>
                                    <Avatar alt={user.name} src={user.logo} sx={{bgcolor: stringToColor(user.name)}}/>
                            </CustomTooltip>
                        </Avatar>
                    )}
                </AvatarGroup>
            </Box>

        </Grid>
    )
}
