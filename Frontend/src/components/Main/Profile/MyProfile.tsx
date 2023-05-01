import React, {useContext, useState} from 'react';
import {useTypeSelector} from "../../utils/Hooks/UseTypeSelector";
import {
    AlertColor,
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton, InputAdornment,
    Link, OutlinedInput,
    Typography
} from "@mui/material";
import {CoursesContainer} from "../Conferencies/ConferenceView/CoursesContainer";
import Edit from '@mui/icons-material/Edit';
import TextField from "@mui/material/TextField";
import {editProfileInfo, editProfilePassword} from "../../../api/EditProfile/Edit";
import {Visibility} from "@mui/icons-material";
import {VisibilityOff} from "@mui/icons-material";
import {Navigate} from "react-router-dom";
import {useActions} from "../../utils/Hooks/UseActions";
import {ManualInfo} from "./ManualInfo";
import {ProfileTitle} from "./ProfileTitle";
import AlertHint from "../../utils/Alert/AlertHint";
import {stringToColor} from "../../utils/StringToColor/StringToColor";
import {ApiProvider} from "../../../api/BaseResponse";
import {CustomTooltip} from "../../utils/CustomTooltip/CustomTooltip";
import {Link as ReactDomLink} from 'react-router-dom';

const MyProfile = () => {
    document.title = 'Мой профиль';
    const user = useTypeSelector(state => state.authUser);
    const {tokenUserAuth} = useActions();
    const SBApi = useContext(ApiProvider);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [imagePath, setImagePath] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [editLogin, setEditLogin] = useState<boolean>(false);
    const [editLoginResponse, setEditLoginResponse] = useState<boolean>(false);
    const [editLoginAlarmColor, setEditLoginAlarmColor] = useState<AlertColor>("success");
    const [editLoginAlarmText, setEditLoginAlarmText] = useState<string>("");

    const submitUserInfo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await SBApi.post("account/update", {
            data: formData,
            headers: {Authorization: `Bearer ${user.token}`}
        });
        if (response.isOk) {
            if (user.token) {
                await tokenUserAuth(user.token);
                setEditLoginResponse(true);
                setEditLoginAlarmColor("success");
                setEditLoginAlarmText("Данные успешно изменены");
            } else {
                setEditLoginResponse(true);
                setEditLoginAlarmColor("success");
                setEditLoginAlarmText("Данные успешно изменены, перезагрузите страницу");
            }
            setEditMode(false);
        }
    }

    const submitUserPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const oldpass = formData.get("oldpass");
        const newpass = formData.get("newpass");
        if (oldpass === newpass) {
            setEditLoginResponse(true);
            setEditLoginAlarmColor("warning");
            setEditLoginAlarmText("Старый и новый пароли совпадают");
            return;
        }
        if (oldpass && newpass && typeof newpass === "string" && typeof oldpass === "string") {
            const data = await editProfilePassword({newPassword: newpass, oldPassword: oldpass});
            if (data) {
                setEditLoginResponse(true);
                setEditLoginAlarmColor("success");
                setEditLoginAlarmText("Пароль успешно измемнен");
            } else {
                setEditLoginResponse(true);
                setEditLoginAlarmColor("error");
                setEditLoginAlarmText("Ошибка сервера");
            }
        } else {
            setEditLoginResponse(true);
            setEditLoginAlarmColor("error");
            setEditLoginAlarmText("Ошибка сервера");
        }
    }

    const inputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePath(url);
        }
    }

    if (!user.login && !user.loading) {
        return <Navigate to={'/uregisterrequest'}/>
    }

    const getUserName = () => {
        if (user.surname && user.name) {
            return `${user.surname} ${user.name}`;
        }
        return user.login;
    };

    return (
        <Box component={'div'}>
            {editMode ?
                <Box component={"form"} onSubmit={submitUserInfo}>
                    <Grid container spacing={1}>
                        <ProfileTitle setEditMode={setEditMode} editModeExist={true} name={getUserName()}/>
                        <Grid item lg={4} xs={6}>
                            <Avatar src={imagePath || user.image}
                                    sx={{height: "250px", width: "250px", bgcolor: stringToColor(user.login)}}/>
                            <input type="file" name={"logo"} id="logo" onChange={inputFileChange}/>
                        </Grid>
                        <Grid item lg={8} xs={6}>
                            <Box sx={{margin: 2}} component={'div'}>
                                <Typography sx={{fontSize: "20px"}} variant={"body2"}>Почта</Typography>
                                <TextField
                                    size={"small"}
                                    margin="none"
                                    required
                                    name="Email"
                                    defaultValue={user.email}
                                />
                            </Box>
                            <Box sx={{margin: 2}} component={'div'}>
                                <Typography sx={{fontSize: "20px"}} variant={"body2"}>Фамилия</Typography>
                                <TextField
                                    size={"small"}
                                    margin="none"
                                    name="Surname"
                                    defaultValue={user.surname}
                                />
                            </Box>
                            <Box sx={{margin: 2}} component={'div'}>
                                <Typography sx={{fontSize: "20px"}} variant={"body2"}>Имя</Typography>
                                <TextField
                                    size={"small"}
                                    margin="none"
                                    name="Name"
                                    defaultValue={user.name}
                                />
                            </Box>
                            <Box sx={{display: "none"}}>
                                <TextField
                                    size={"small"}
                                    margin="none"
                                    name="id"
                                    defaultValue={user.id}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box component={"div"} sx={{margin: "20px 0"}}>
                        {editLogin
                            ? <Box component={"form"} onSubmit={submitUserPassword}>
                                <Typography sx={{fontSize: "20px", marginBottom: 2}} variant={"body2"}>Измените
                                    пароль (не знаю
                                    зачем)</Typography>
                                <OutlinedInput
                                    size={"small"}
                                    id="outlined-adornment-password"
                                    required
                                    name="oldpass"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(prev => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="Старый пароль"
                                />
                                <OutlinedInput
                                    size={"small"}
                                    id="outlined-adornment-password"
                                    required
                                    name="newpass"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(prev => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="Новый пароль"
                                />
                                <br/>
                                <Button sx={{marginTop: 2}} size={"medium"} variant={"contained"}
                                        type={"submit"}>Сохранить</Button>
                            </Box>
                            :
                            <Link variant={"h5"} onClick={() => setEditLogin(prev => !prev)} underline="hover">
                                Измените пароль<Edit fontSize="small"/>
                            </Link>
                        }
                    </Box>
                    <Box>
                        <Button sx={{marginTop: 2}} size={"medium"} variant={"contained"}
                                type={"submit"}>Сохранить</Button>
                    </Box>
                </Box>
                :
                <Grid container spacing={1}>
                    <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant={"h4"}>Личный кабинет</Typography>
                            <Link variant={"h5"} onClick={() => setEditMode(prev => !prev)} underline="hover">
                                Редактировать<Edit/>
                            </Link>
                        </Box>
                        <Divider/>
                    </Grid>
                    <ManualInfo user={user}/>
                </Grid>
            }
            <AlertHint collapse={editLoginResponse} severity={editLoginAlarmColor} size={"small"}
                       text={editLoginAlarmText}/>
            <CoursesContainer userId={user.login}/>
            <br/>
            <Box sx={{
                borderRadius: 2,
                boxShadow: "0px 0px 15px 0px rgba(34, 60, 80, 0.15)",
                padding: 2,
                width: "100%",
                boxSizing: "border-box"
            }}>
                <Typography variant={"h5"}>У вас есть возможность создавать свои курсы и публиковать их после
                    модерации</Typography>
                <CustomTooltip text={""}>
                    <Button component={ReactDomLink} to={"/createcourse"} variant={"contained"}>Создать свой
                        курс</Button>
                </CustomTooltip>
            </Box>
        </Box>
    );
};

export default MyProfile;
