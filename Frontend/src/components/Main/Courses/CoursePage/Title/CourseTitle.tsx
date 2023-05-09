import React, {useContext, useState} from 'react';
import {Box, Button, Divider, Grid, Typography} from "@mui/material";
import AlertHint from "../../../../utils/Alert/AlertHint";
import {CourseInfo, getLinkText, getRoleDescription, Roles} from "../../utils";
import {useNavigate} from "react-router-dom";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";

export const CourseTitle: React.FC<CourseInfo & {id: string}> = ({id, name, description, role, language}) => {
    const [info, setInfo] = useState<string>("");
    // const token = useTypeSelector(store => store.authUser.token);
    // const id = useTypeSelector(store => store.authUser.id);
    const SBApi = useContext(ApiProvider);
    const navigate = useNavigate();
    const token = useTypeSelector(store => store.authUser.token);

    const joinCourse = async () => {
        if (!token) {
            navigate("/signin");
            return;
        }
        const data = await SBApi.withAuthorization(token).post("course/join", {params: {courseId: id}});
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
        if (!data.isOk) {
            setInfo(data.fullError);
            return;
        }
        window.location.reload();
    }

    const ActionButton = async () => {
        switch (role) {
            case Roles.Admin:
            case Roles.Owner:
                navigate('/course/' + id + "/edit", {state: {canEdit: true, id, name, description, language}});
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
                <Typography variant={"h4"}>{name}</Typography>
                <Typography variant="h5" mb={1}>
                    Статус: {getRoleDescription(role)}
                </Typography>
                {
                    <Button
                        onClick={ActionButton}
                        sx={{cursor: "pointer"}}
                        variant={"contained"}
                    >
                        {getLinkText(role)}
                    </Button>}
            </Box>
            <Divider/>
            <AlertHint text={info} size={"small"} collapse={!!info} severity={"info"}/>
        </Grid>
    );
};
