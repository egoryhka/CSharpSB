import React, {useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppBar, Button, Typography, Container, Stack, Avatar, Box} from "@mui/material";
import {useTypeSelector} from "../utils/Hooks/UseTypeSelector";
import {useActions} from "../utils/Hooks/UseActions";
import {OptionsModal} from "./OptionsModal/OptionsModal";
import logo from "./../../image/companyLogo/img.png";
import {SearchField} from "./SearchField/SearchField";

export const Header: React.FC = () => {
        const login = useTypeSelector(store => store.authUser.login);
        const name = useTypeSelector(store => store.authUser.name);
        const navigate = useNavigate();
        const [openedModal, setOpenedModal] = useState(false);
        const {userLogout} = useActions();

        const modalTransform = useRef<boolean>(false);

        const logout = () => {
            userLogout();
            navigate("/");
        }

        const closeModal = (e: React.MouseEvent) => {
            e.stopPropagation();
            modalTransform.current = false;
            setOpenedModal(false);

            setTimeout(() => {
            }, 300);
        }

        return (
            <header>
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
                    enableColorOnDark={true}
                >
                    <Container maxWidth={"lg"}>
                        <nav>
                            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-around"}}
                                 pt={1} pb={1}>
                                <Typography variant={"h6"} color={"inherit"}
                                            sx={{display: "flex", alignItems: "center", justifyContent: "space-around"}}
                                            component={Link} to={"/"}>
                                    <Avatar sx={{borderRadius: 0, marginRight: 1}} src={logo}/>
                                    <Typography sx={{textShadow: "1px 1px 1px rgba(0,0,0,0.20)"}}
                                                variant={"h6"}>SbSharp</Typography>
                                </Typography>
                                <SearchField/>
                            </Box>

                            {login ? <Stack direction="row" spacing={2}>
                                <Button variant={"contained"} to={'/myprofile'} component={Link}>{name || login}</Button>
                                <Button variant={"contained"} onClick={logout}>Выйти</Button>

                            </Stack> : <Stack direction="row" spacing={2}>
                                <Button variant={"contained"} color={"primary"} component={Link}
                                        to={"/registration"}>Регистрация</Button>
                                <Button variant={"contained"} component={Link} to={"/signin"}>Войти</Button>
                            </Stack>}
                        </nav>
                    </Container>
                </AppBar>
                {openedModal && <OptionsModal modalTransform={modalTransform.current} onClose={closeModal}/>}
            </header>
        );
    }
;
