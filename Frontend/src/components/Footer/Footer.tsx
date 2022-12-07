import React from 'react';
import {AppBar, Container} from "@mui/material";

export const Footer = () => {
    return (
        <footer>
            <AppBar
                position="static"
                color="primary"
                elevation={0}
                sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
                enableColorOnDark={true}
            >
                <Container maxWidth={"lg"}>
                    <p>Диплом?</p>
                    <h3>created by sanay152 & Marsh</h3>
                    <span>all rights didn't reserve</span>
                </Container>
            </AppBar>
        </footer>
    );
};
