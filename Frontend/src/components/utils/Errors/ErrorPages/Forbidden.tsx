import React from 'react';
import {Typography, Box, Grid, Link, Button} from '@mui/material';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import {Link as RouterLink} from 'react-router-dom';

export const Forbidden = () => {
    return (
        <Box
            sx={{display: "grid", justifyContent: "center", justifyItems: "center", height: "500px"}}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <Grid container spacing={3} maxWidth={600} sx={{
                    borderRadius: "25px",
                    border: "2px solid grey", padding: 3
                }}>
                    <Grid item xs={3}>
                        <NoEncryptionIcon sx={{fontSize: 100}}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant={"h5"}>Похоже у вас не хватает прав, для осуществления этого действия</Typography>
                        <Button component={RouterLink} to={'/'} variant={"contained"}>На главную</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
