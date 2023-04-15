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
                    <p>Првильное питание</p>
                    <h3>В ролях: передний - Кузьмич Александр, задние - Стрелков Андрей и Демьяненко Егор, художник - Леш</h3>
                    <span>all rights didn't reserve</span>
                </Container>
            </AppBar>
        </footer>
    );
};
