import React from 'react';
import {Avatar, Box, Grid, Typography} from "@mui/material";
import {userState} from "../../../redux/types/user/user";
import {otherUserProfileState} from "../../../redux/types/user/otherUserProfile";

interface ManualInfoProps {
    user: userState | otherUserProfileState;
}

export const ManualInfo: React.FC<ManualInfoProps> = ({user}) => {
    return (
        <>
            <Grid item lg={4} xs={6}>
                <Avatar src={user.image} sx={{height: "250px", width: "250px"}}/>
            </Grid>
            <Grid item lg={8} xs={6}>
                <Box sx={{margin: 3}} component={'div'}>
                    <Typography sx={{fontSize: "20px"}} variant={"body2"}>Почта</Typography>
                    <Typography variant={"h5"}>{user.email}</Typography>
                </Box>
                <Box sx={{margin: 3}} component={'div'}>
                    <Typography sx={{fontSize: "20px"}} variant={"body2"}>Фамилия</Typography>
                    <Typography variant={"h5"}>{user.surname || "Не указано"}</Typography>
                </Box>
                <Box sx={{margin: 3}} component={'div'}>
                    <Typography sx={{fontSize: "20px"}} variant={"body2"}>Имя</Typography>
                    <Typography variant={"h5"}>{user.name || "Не указано"}</Typography>
                </Box>
                <Box sx={{margin: 3}} component={'div'}>
                    <Typography sx={{fontSize: "20px"}} variant={"body2"}>Логин для входа</Typography>
                    <Typography variant={"h5"}>{user.login || "Не указано"}</Typography>
                </Box>
            </Grid>
        </>
    );
};

