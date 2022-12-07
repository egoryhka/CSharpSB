import React, {useRef, useState} from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import {getLinkText, roles} from "../../../../utils/LinkTextFromRole/LinkTextFromRole";
import {IResponceStatuses} from "../../../../utils/ResponceStatuses/ReaponceIntertface";
import AlertHint from "../../../../utils/Alert/AlertHint";
import {Link} from "react-router-dom";

interface ConferenceTitleProps {
    userRoles: roles;
    title: string;
    confId: string;
}

const ConferenceTitle: React.FC<ConferenceTitleProps> = ({userRoles, title, confId}) => {
    const [responseStatus, setResponseStatus] = useState<IResponceStatuses>({});

    return (
        <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"}>{title}</Typography>
                {userRoles.isAdmin ?
                    <Typography sx={{cursor: "pointer"}} variant={"h5"}>
                        {getLinkText(userRoles)}
                    </Typography> :
                    <Typography to={`/conference/${userRoles.isGuest ? "join" : "leave"}/${confId}`}
                                sx={{cursor: "pointer"}} variant={"h5"}
                                component={Link}>
                        {getLinkText(userRoles)}
                    </Typography>}
            </Box>
            <Divider/>
            {responseStatus.info &&
            <AlertHint text={responseStatus.info} size={"small"} collapse={Boolean(responseStatus.info)}
                       severity={responseStatus.isError ? "error" : "success"}/>}
        </Grid>
    );
};

export default ConferenceTitle;
