import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Avatar, Box, Button, Container, LinearProgress, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SendIcon from '@mui/icons-material/Send';
import {useActions} from "../../utils/Hooks/UseActions";
import AlertHint from "../../utils/Alert/AlertHint";
import {ApiProvider} from "../../../api/BaseResponse";

interface a {
    data: string;
}

const Registration = () => {
    const {userAuth} = useActions();
    const [loading, setLoading] = React.useState<boolean>(false);
    const SBApi = useContext(ApiProvider);
    document.title = 'Регистрация';

    const [login, setLogin] = useState<string>('')

    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');
    const [nonSamePasswords, setNonSamePasswords] = useState<boolean>(false);

    const navigate = useNavigate();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === passwordRepeat) {
            setLoading(true);
            // const data = await registrationRequest({password, login});
            const data = await SBApi.post<a>("account/register", {data: {password, login}});
            setLoading(false);
            console.log(data)
            if (data.isOk) {
                await SBApi.get("course/2")
                // setLoading(true);
                // await userAuth(login, password, true);
                // setLoading(false);
                // navigate('/myprofile');
            }
        } else {
            setNonSamePasswords(true);
        }
    }



    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.dark'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h4" textAlign="center" marginBottom={6}>
                    Регистрация в 3 шага
                </Typography>

                <Box component="form" onSubmit={submitForm} sx={{
                    marginBottom: 32,
                }}>
                    <Typography component="h3" variant="caption" textAlign="center" marginBottom={4}>
                        Введите логин и пароль для будущего аккаунта
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        id="outlined-multiline-flexible"
                        label="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        sx={{marginBottom: 3}}
                    />
                    <TextField
                        error={nonSamePasswords}
                        sx={{marginBottom: 3}}
                        fullWidth
                        required
                        id="outlined-multiline-flexible"
                        label="Пароль"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        error={nonSamePasswords}
                        sx={{marginBottom: 3}}
                        fullWidth
                        required
                        id="outlined-multiline-flexible"
                        label="Повторите пароль"
                        value={passwordRepeat}
                        type="password"
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
                    <AlertHint closeHandler={() => {
                        setNonSamePasswords(false);
                    }} severity={"error"} size={"small"} text={"Пароли не совпадают!"} collapse={nonSamePasswords}/>
                    <Button
                        endIcon={<SendIcon/>}
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{padding: 1}}
                    >
                        Зарегистрироваться
                    </Button>
                </Box>
                {loading && <Box sx={{width: '100%'}}>
                    <Typography>Авторизуемся</Typography>
                    <LinearProgress/>
                </Box>}
            </Box>
        </Container>
    );
};

export default Registration;
