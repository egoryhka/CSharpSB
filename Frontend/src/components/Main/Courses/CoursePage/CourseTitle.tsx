import React, {useContext, useState} from 'react';
import {Box, Button, Divider, Grid, Typography} from "@mui/material";
import {getLinkText, getRoleDescription, Roles} from "../utils";
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {ApiProvider} from "../../../../api/BaseResponse";
import AlertHint from "../../../utils/Alert/AlertHint";

interface ConferenceTitleProps {
    userRoles?: Roles;
    title?: string;
    id?: string;
    errors?: string;
}

const CourseTitle: React.FC<ConferenceTitleProps> = ({id, userRoles, title}) => {
    const [info, setInfo] = useState<string>("");
    // const token = useTypeSelector(store => store.authUser.token);
    // const id = useTypeSelector(store => store.authUser.id);
    const SBApi = useContext(ApiProvider);
    const navigate = useNavigate();
    const token = useTypeSelector(store => store.authUser.token);
    const changeStatus = async () => {
        // const response = await SBApi.withAuthorization(token as string).post("course/join", {params: {userId: id, courseId: courseId}});
        // setResponseStatus(response)
        // if (response.isOk) {
        //     window.location.reload();
        // }
    }

    const joinCourse = async () => {
        if (!token) {
            navigate("/signin");
            return;
        }
        const data = await SBApi.withAuthorization(token).post("course/join", {params: {courseId: id}});
        console.log(data);
        if (!data.isOk) {
            setInfo(data.fullError);
            return;
        }
        window.location.reload();
    }

    const leaveCourse = async () => {
        if (!token) {
            navigate("/signin");
            return;
        }
        const data = await SBApi.withAuthorization(token).post("course/leave", {params: {courseId: id}});
        console.log(data);
        if (!data.isOk) {
            setInfo(data.fullError);
            return;
        }
        window.location.reload();
    }

    const ActionButton = async () => {
        switch (userRoles) {
            case Roles.Admin:
            case Roles.Owner:
                navigate('/course/' + id + "/edit");
                return;
            case Roles.Guest:
                void joinCourse();
                return;
            case Roles.Participant:
                void leaveCourse();
                return;
        }
    }

    return (
        <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"}>{title}</Typography>
                <Typography variant="h5" mb={1}>
                    Статус: {getRoleDescription(userRoles)}
                </Typography>
                {
                    <Button
                        onClick={ActionButton}
                        sx={{cursor: "pointer"}}
                        variant={"contained"}
                    >
                        {getLinkText(userRoles)}
                    </Button>}
            </Box>
            <Divider/>
            <AlertHint text={info} size={"small"} collapse={!!info} severity={"info"}/>
        </Grid>
    );
};

export default CourseTitle;
