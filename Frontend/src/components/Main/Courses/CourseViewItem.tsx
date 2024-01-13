import {Avatar, AvatarGroup, Box, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {ICourse} from "../../../api/ConferenceTimeLine/getConferencesTimeLine";
import {CustomTooltip} from "../../utils/CustomTooltip/CustomTooltip";
import {blue} from "@mui/material/colors";

export const CourseViewItem = ({name, id, users, description}: ICourse) => {
    const BGColor = blue[100];

    return (
        <Grid key={id} component={Link} replace to={`course/${id}`} item
              bgcolor={BGColor} sx={{width: "100%", height: 80, opacity: .8, borderRadius: 5, padding: 1}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Grid>
                    <Typography variant={"h5"}>С# {name}</Typography>
                </Grid>
                <AvatarGroup total={users.length ?? 0}>
                    {users.map(user =>
                        <Avatar>
                            <CustomTooltip text={user.name}>
                                <Avatar alt={user.name} src={user.logo} sx={{bgcolor: BGColor}}/>
                            </CustomTooltip>
                        </Avatar>
                    )}
                </AvatarGroup>
            </Box>

        </Grid>
    )
}
