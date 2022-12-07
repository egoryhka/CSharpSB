import React, {useState} from 'react';
import {createNewConferenceRequest} from "../../../api/ConferenceActions/Create";
import {
    Container,
    Button,
    Typography,
    Grid,
    Box,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox, Collapse, Alert, Avatar, Divider, AlertColor
} from '@mui/material';
import {Link} from 'react-router-dom';

const CreateConference = () => {
    document.title = "Создание конференции";

    const [serverResponceStatus, setServerResponceStatus] = React.useState<boolean>(false);
    const [serverResponceStatusColor, setServerResponceStatusColor] = useState<AlertColor>("success");
    const [serverResponceStatusText, setServerResponceStatusText] = useState<string>("");
    const [serverResponceLink, setServerResponceLink] = useState<string>("");

    const createConfHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const responce = await createNewConferenceRequest(formData);
        if (responce.isOk) {
            setServerResponceStatusColor("success");
            setServerResponceStatus(true);
            setServerResponceLink(responce.editLink);
            setServerResponceStatusText("Ваша конференция успешно создана, перейдите по ссылке, чтобы назначать модераторов и приглашать участников");
        } else {
            setServerResponceStatusColor("error");
            setServerResponceStatus(true);
            setServerResponceStatusText(responce.errorMessage);
        }
    }

    //---------- Онлайн Офлайн ------------//

    const [online, setOnline] = React.useState<boolean>(false);
    const [offline, setOffline] = React.useState<boolean>(false);

    const onlineChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnline(event.target.checked);
    };

    const offlineChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffline(event.target.checked);
    };

    const onlineOfflineError = [online, offline].filter((v) => v).length > 0;

    //---------- -------------- ------------//

    //---------- Доступ ------------//
    const [accessFree, setAccessFree] = React.useState<boolean>(false);
    const [accessPassword, setAccessPassword] = React.useState<boolean>(false);
    const [accessLink, setAccessLink] = React.useState<boolean>(false);

    const accessFreeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccessFree(event.target.checked);
    };

    const accessPasswordChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccessPassword(event.target.checked);
    };

    const accessLinkChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccessLink(event.target.checked);
    };

    const accessError = [accessFree, accessPassword, accessLink].filter((v) => v).length > 0;

    const [imagePath, setImagePath] = useState<string>("");
    const inputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file)
            setImagePath(url)
        }
    }
    //---------- -------------- ------------//

    return (
        <Container component="main" maxWidth={"md"}>
            <Typography variant="h6" gutterBottom>
                Создать конференцию
            </Typography>
            <Box component={"form"} onSubmit={createConfHandler}>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Название"
                            name={"name"}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Описание"
                            name="description"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            variant="standard"
                            fullWidth
                            required
                            name="startDate"
                            label="Начало конференции"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            variant="standard"
                            fullWidth
                            required
                            name="endDate"
                            label="Окончание конференции"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={offline}
                                                                 onChange={offlineChecked}
                                                                 inputProps={{
                                                                     'aria-label': 'Checkbox A',
                                                                 }}/>} label="Оффлайн"/>
                            <FormControlLabel control={<Checkbox checked={online}
                                                                 onChange={onlineChecked}
                                                                 inputProps={{
                                                                     'aria-label': 'Checkbox B',
                                                                 }}/>} label="Oнлайн"/>
                            <Box sx={{width: '100%'}}>
                                <Collapse in={!onlineOfflineError}>
                                    <Alert
                                        severity="warning"
                                        sx={{mb: 2}}
                                    >
                                        Необходимо выбрать хотя бы один вариант
                                    </Alert>
                                </Collapse>
                            </Box>
                        </FormGroup>
                    </Grid>
                    <Grid hidden={!offline} item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Место проведения"
                            name={"offlineConnectionPlacement"}
                            variant="standard"
                        />
                    </Grid>
                    <Grid hidden={!online} item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Ссылка на онлайн встречу"
                            name={"onlineConnectionLink"}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Участие в конференции будет доступно:
                        </Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={accessFree}
                                                                 onChange={accessFreeChecked}
                                                                 inputProps={{
                                                                     'aria-label': 'Checkbox C',
                                                                 }}/>} label="Всем желающим"/>
                            <FormControlLabel control={<Checkbox checked={accessPassword}
                                                                 onChange={accessPasswordChecked}
                                                                 inputProps={{
                                                                     'aria-label': 'Checkbox D',
                                                                 }}/>} label="По паролю"/>
                            <Collapse in={accessPassword}>
                                <TextField
                                    fullWidth
                                    label="Пароль для участия в конференции"
                                    name="Password"
                                    variant="standard"
                                />
                            </Collapse>
                            <FormControlLabel control={<Checkbox checked={accessLink}
                                                                 onChange={accessLinkChecked}
                                                                 name={"inviteLink"}
                                                                 value={true}
                                                                 inputProps={{
                                                                     'aria-label': 'Checkbox E',
                                                                 }}/>} label="По ссылке-приглашению"/>
                            <Box sx={{width: '100%'}}>
                                <Collapse in={!accessError}>
                                    <Alert
                                        severity="warning"
                                        sx={{mb: 2}}
                                    >
                                        Необходимо выбрать хотя бы один вариант
                                    </Alert>
                                </Collapse>
                            </Box>
                            <Collapse in={accessLink}>
                                <Alert
                                    severity="success"
                                    sx={{mb: 2}}
                                >
                                    *Ссылка-приглашение будет доступна после создания конференции
                                </Alert>
                            </Collapse>
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid sx={{margin: "24px 0"}} item md={12} xs={12}>
                    <Typography>
                        Логотип конференции: <input accept="image/*" type="file" name={"logo"} id="logo"
                                                    onChange={inputFileChange}/>
                    </Typography>
                    {imagePath && <Avatar src={imagePath} sx={{height: "250px", width: "250px"}}>
                        {/* noop */}
                    </Avatar>}
                    <Divider/>
                </Grid>
                <Grid sx={{margin: "24px 0"}} item md={12} xs={12}>
                    <Typography>
                        Подробное описание конференции, можно приложить файл: <input type="file"
                                                                                     accept=".doc,.docx,.pdf,application/msword"
                                                                                     name={"fAQDoc"} id="fAQDoc"/>
                    </Typography>
                    <Divider/>
                </Grid>
                <Box sx={{marginTop: 3}}>
                    <Button variant={"contained"} type={'submit'}>Создать</Button>
                    {" "}
                    <Button variant={"contained"} type={'reset'}>Очистить</Button>
                </Box>
            </Box>
            <Box sx={{width: '100%'}}>
                <Collapse in={serverResponceStatus}>
                    <Alert
                        severity={serverResponceStatusColor}
                        sx={{mb: 2}}
                    >
                        {
                            <Typography>
                                {serverResponceStatusText}
                                {" "}
                                {serverResponceLink &&
                                <Link to={`/conferencepage/${serverResponceLink}`}>Ссылка</Link>}
                            </Typography>
                        }
                    </Alert>
                </Collapse>
            </Box>
        </Container>
    );
};

export default CreateConference;
