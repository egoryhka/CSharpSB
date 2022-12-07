import React from 'react';
import {Typography, Box, Grid, Link} from '@mui/material';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import {Link as RouterLink} from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <Box
            sx={{display: "grid", justifyContent: "center", justifyItems: "center", height: "500px"}}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <Grid container spacing={1} maxWidth={600} sx={{
                    borderRadius: "25px",
                    border: "2px solid grey", padding: 3
                }}>
                    <Grid item lg={3}>
                        <NotListedLocationIcon sx={{fontSize: 100}}/>
                    </Grid>
                    <Grid item lg={9}>
                        <Typography variant={"h5"}>Страница по запросу не найдена</Typography>
                        <Link component={RouterLink} to={'/'} variant={"body1"}>На главную</Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
