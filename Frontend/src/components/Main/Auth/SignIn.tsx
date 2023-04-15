import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {AlertColor, Button, Container, LinearProgress} from "@mui/material";
import {Navigate, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React, {useState} from "react";
import {useTypeSelector} from '../../utils/Hooks/UseTypeSelector';
import {useActions} from '../../utils/Hooks/UseActions';
import SendIcon from "@mui/icons-material/Send";
import AlertHint from "../../utils/Alert/AlertHint";


const SignIn = () => {
    const [saveMe, setSaveMe] = useState<boolean>(false);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [severityAlert, setSeverityAlert] = useState<AlertColor>("error");
    const [textAlert, setTextAlert] = useState<string>("warning");

    const loading = useTypeSelector(state => state.authUser.loading);
    const error = useTypeSelector(state => state.authUser.error);
    const login = useTypeSelector(state => state.authUser.login);

    const {userAuth} = useActions();

    if (login) {
        return <Navigate replace to={`/myprofile`}/>
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const login = data.get('login');
        const password = data.get('password');
        if (login && password) {
            userAuth(login.toString(), password.toString(), saveMe);
        } else {
            setShowAlert(true);
            setSeverityAlert("warning");
            setTextAlert("Поля не могут быть пустыми");
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Авторизация
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Логин или электронная почта"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={() => setSaveMe(prev => !prev)} value={saveMe} color="primary"/>}
                        label="Запомнить меня"
                    />
                    <AlertHint severity={severityAlert} text={error || textAlert} collapse={showAlert || Boolean(error)}
                               size={"small"}/>
                    <Button
                        endIcon={<SendIcon/>}
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{padding: 1, marginTop: 2, marginBottom: 2}}
                    >
                        Войти
                    </Button>
                    {loading ? <LinearProgress/> : undefined}
                    <Grid container>
                        <Grid item xs>
                            <Link to={"/resetpass"}>
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link replace to={"registration"}>
                                Зарегистрируйтесь в 3 шага
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;
