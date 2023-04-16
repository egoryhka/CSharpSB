import React, {useContext, useRef, useState} from 'react';
import {Box, Button, Divider, Grid, Typography} from "@mui/material";
import {getLinkText, roles} from "../../../../utils/LinkTextFromRole/LinkTextFromRole";
import {IResponceStatuses} from "../../../../utils/ResponceStatuses/ReaponceIntertface";
import AlertHint from "../../../../utils/Alert/AlertHint";
import {Link} from "react-router-dom";
import {ApiProvider, BaseResponse} from "../../../../../api/BaseResponse";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";

interface ConferenceTitleProps {
    userRoles: roles;
    title: string;
    courseId: string;
}

const ConferenceTitle: React.FC<ConferenceTitleProps> = ({userRoles, title, courseId}) => {
    const [responseStatus, setResponseStatus] = useState<BaseResponse | null>(null);
    const token = useTypeSelector(store => store.authUser.token);
    const id = useTypeSelector(store => store.authUser.id);
    const SBApi = useContext(ApiProvider);
    const changeStatus = async () => {
        const response = await SBApi.withAuthorization(token as string).post("course/join", {params: {userId: id, courseId: courseId}});
        setResponseStatus(response)
        if (response.isOk) {
            window.location.reload();
        }
    }

    return (
        <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"}>{title}</Typography>
                {userRoles.isAdmin ?
                    <Typography sx={{cursor: "pointer"}} variant={"h5"}>
                        {getLinkText(userRoles)}
                    </Typography> :
                    <Button
                        onClick={changeStatus}
                        sx={{cursor: "pointer"}}
                        variant={"contained"}
                    >
                        {getLinkText(userRoles)}
                    </Button>}
            </Box>
            <Divider/>
            {responseStatus?.errors?.length &&
                <AlertHint text={responseStatus.errors.join(" ")} size={"small"} collapse={Boolean(responseStatus.errors)}
                           severity={"error"}/>}
        </Grid>
    );
};

export default ConferenceTitle;
