import React from 'react';
import {Link as urlLink} from 'react-router-dom';
import {Button, Card, Typography} from '@mui/material';

export const UnregisterRequest = () => {
    return (
        <Card sx={{marginTop: 3, alignSelf: "center"}}>
            <Typography sx={{paddingBottom: 3}} component="h1" variant="h4" textAlign="center">Похоже вы
                не авторизованы, чтобы перейти в профиль</Typography>
            <Typography textAlign={"center"}>
                <Button variant={"contained"}
                        component={urlLink}
                        to={'/signin'}>
                    Авторизуйтесь</Button>
            </Typography>
        </Card>
    );
};
