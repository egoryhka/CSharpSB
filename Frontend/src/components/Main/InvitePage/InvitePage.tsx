import React, {useEffect, useState} from "react";
import {Loader} from "../../utils/Loader/Loader";
import {Avatar, Box, Button, Divider, Grid, TextField, Typography, Link} from "@mui/material";
import {isValidEmail} from "../../utils/ValidEmailChecker/CheckValidEmail";
import AlertHint from "../../utils/Alert/AlertHint";
import SendIcon from "@mui/icons-material/Send";
import {ConfData, getShortConferenceInfo} from "../../../api/ConferenceActions/getConferencePage";
import {AcceptInviteLink} from "../../../api/ConferenceActions/InviteAccess";
import {useNavigate, useParams} from 'react-router-dom';
import {useActions} from "../../utils/Hooks/UseActions";
import {UseSaveMeCheckBox} from "../../utils/Hooks/UseSaveMeCheckBox";
import {CustomLinearProgress} from "../../utils/CustomLinearProgress/CustomLinearProgress";
import {useTypeSelector} from "../../utils/Hooks/UseTypeSelector";
import {stringToColor} from "../../utils/StringToColor/StringToColor";

const InvitePage = () => {
    document.title = 'Регистрация на конференцию';
    const [confData, setConfData] = useState<ConfData>();
    const routeParams = useParams();

    const [loading, setLoading] = useState<boolean>();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const [newEmail, setNewEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {saveMe, saveMeCheckbox} = UseSaveMeCheckBox();
    const [correctEmail, setCorrectEmail] = useState<string>("");
    const navigate = useNavigate();
    const {userAuth} = useActions();
    const {email, error} = useTypeSelector(store => store.authUser);

    useEffect(() => {
        getShortConfInfo();
    }, [])

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isValidEmail(newEmail)) {
            setSubmitLoading(true);
            const isOk = await AcceptInviteLink(newEmail, password);
            if (isOk) {
                userAuth(newEmail.toString(), password.toString(), saveMe);
            } else {
                setCorrectEmail("Пользователь с таким Email уже зарегистрирован");
            }
        } else {
            setCorrectEmail("Невалидный Email");
        }
    }

    useEffect(() => {
        if (email && confData?.pageLink) {
            navigate(`/conferencepage/${confData?.pageLink}`);
        }
    }, [email, confData?.pageLink]);

    const getShortConfInfo = async () => {
        setLoading(true);
        if (routeParams.inviteId) {
            const response = await getShortConferenceInfo(routeParams.inviteId);
            if (response.isOk && response.isFounded) {
                setConfData(response);
                setLoading(false);
            } else {
                navigate("/notfound");
            }
        } else {
            navigate("/notfound");
        }
    }

    const toAuthHandle = () => {
        navigate("/signin", {state: {action: "join", to: confData?.pageLink}});
    }

    return (loading && confData === undefined)
        ? <Loader text={"Подгружаем информацию по ссылке приглашению"}/>
        : <Box
            sx={{display: "grid", justifyContent: "center", justifyItems: "center", height: "500px"}}>
            <Box component="form" onSubmit={submitForm} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <Typography variant="h4" textAlign="center">
                    Приглашение на конференцию:
                </Typography>
                <Typography variant="h4" textAlign="center">
                    {confData?.name}
                </Typography>
                <Avatar sx={{width: 120, height: 120, bgcolor: stringToColor(email), margin: "0 auto"}}
                        src={confData?.logo}/>
                <Divider/>
                <Typography variant="body2" mt={4}>
                    *Пройдите быструю регистрацию, чтобы принять участие
                </Typography>
                <Grid container spacing={1} maxWidth={600} sx={{
                    padding: 3
                }}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-multiline-flexible"
                        label="Электронная почта"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        error={Boolean(correctEmail)}
                        sx={{marginBottom: 2}}
                    />
                    <AlertHint
                        collapse={Boolean(correctEmail || error)}
                        text={correctEmail || (error ?? "")}
                        size={"small"}
                        severity={"error"}/>
                    <TextField
                        fullWidth
                        required
                        id="outlined-multiline-flexible"
                        label="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(correctEmail)}
                        sx={{marginBottom: 1}}
                    />
                    <CustomLinearProgress submitLoading={submitLoading}/>
                    {saveMeCheckbox}
                    <Button
                        endIcon={<SendIcon/>}
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{padding: 1}}
                    >
                        Быстрая регистрирация
                    </Button>
                    <Typography variant="body2" mt={1}>
                        Уже есть учетная запись?{" "}
                        <Link onClick={toAuthHandle}>
                            Авторизуйтесь
                        </Link>
                    </Typography>
                </Grid>
            </Box>
        </Box>
};

export default InvitePage;
