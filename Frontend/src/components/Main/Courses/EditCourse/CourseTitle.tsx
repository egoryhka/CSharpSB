import React from 'react';
import {Box, Button, Divider, Grid, Typography} from "@mui/material";
import {getLinkText, getRoleDescription, Roles} from "../utils";
import {useNavigate} from "react-router-dom";

interface ConferenceTitleProps {
    userRoles?: Roles;
    title?: string;
    id?: string;
    errors?: string;
}

const CourseTitle: React.FC<ConferenceTitleProps> = ({id, userRoles, title}) => {
    // const [responseStatus, setResponseStatus] = useState<BaseResponse | null>(null);
    // const token = useTypeSelector(store => store.authUser.token);
    // const id = useTypeSelector(store => store.authUser.id);
    // const SBApi = useContext(ApiProvider);
    const navigate = useNavigate();
    const changeStatus = async () => {
        // const response = await SBApi.withAuthorization(token as string).post("course/join", {params: {userId: id, courseId: courseId}});
        // setResponseStatus(response)
        // if (response.isOk) {
        //     window.location.reload();
        // }
    }

    const ActionButton = async () => {
        switch (userRoles) {
            case Roles.Admin:
                navigate('/course/' + id + "/edit");
                return;
            case Roles.Owner:
                navigate('/course/' + id + "/edit");
                return;
            case Roles.Guest:
                navigate('/course/' + id + "/join");
                return;
            case Roles.Participant:
                navigate('/course/' + id + "/leave");
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
            {/*{responseStatus?.errors?.length &&*/}
            {/*    <AlertHint text={responseStatus.errors.join(" ")} size={"small"} collapse={Boolean(responseStatus.errors)}*/}
            {/*               severity={"error"}/>}*/}
        </Grid>
    );
};

export default CourseTitle;
