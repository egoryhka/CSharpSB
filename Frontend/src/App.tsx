import React, { useEffect } from 'react';
import { useActions } from './utils/UseActions';
import {Container, Paper, ThemeProvider } from '@mui/material';
import { useTypeSelector } from './utils/UseTypeSelector';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Main } from './components/Main/Main';
import { store } from './redux/redux';
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';

export const App: React.FC = () => {
    const { tokenUserAuth } = useActions();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenUserAuth(token);
        }
    }, []);

    const theme = useTypeSelector(store => store.theme.currentTheme);

    return (
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Header/>
                    <Paper sx={{borderRadius: "0", flex: "1 0 auto"}} >
                        <Container className={"main-container"} maxWidth={"lg"}>
                            <Main/>
                        </Container>
                    </Paper>
                    <Footer/>
                </ThemeProvider>
            </BrowserRouter>
    );
};


