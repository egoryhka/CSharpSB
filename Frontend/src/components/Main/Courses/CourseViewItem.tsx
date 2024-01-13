import {Avatar, AvatarGroup, Box, Card, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {ICourse} from "../../../api/ConferenceTimeLine/getConferencesTimeLine";
import {CustomTooltip} from "../../utils/CustomTooltip/CustomTooltip";
import {blue, green} from "@mui/material/colors";

export const CourseViewItem = ({name, id, users, description}: ICourse) => {
    const BGColor = blue[400];

    return (
        <Card key={id} component={Link} replace to={`course/${id}`}
               sx={{width: "100%", opacity: .8, borderRadius: 5, padding: 1, borderColor: BGColor}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Grid>
                    <Typography display={"inline"} variant={"h5"} color={green[700]}>C# {" "}</Typography><Typography display={"inline"} variant={"h5"} color={BGColor}>{name}</Typography>
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

        </Card>
    )
}
