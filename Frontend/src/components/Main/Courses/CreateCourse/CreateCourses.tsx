import {Autocomplete, Box, Button, Card, MenuItem, Select, TextField, Typography} from '@mui/material';
import React, {useContext} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {UnauthorizedPage} from "../../../utils/Hooks/UnathorizedPage";
import AlertHint from "../../../utils/Alert/AlertHint";
import {ApiProvider} from "../../../../api/BaseResponse";

const title = `Жирный курсив:
**Жирный**

Посмотри например такой вариант для HTML:
\`\`\`html
<h1>Hello World</h1>
\`\`\`

для React: 
\`\`\`jsx mdx:preview
import React from "react";
\`\`\`

для С#:
\`\`\`c#
var exist = _context.Users.Find(userUpdate.Id);
\`\`\``

export default () => {
    const [description, setDescription] = React.useState(title);
    const [language, setLanguage] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [successText, setSuccessText] = React.useState("");
    const [timer, setTimer] = React.useState(5);
    //const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const SBApi = useContext(ApiProvider);
    const token = useTypeSelector(store => store.authUser.token);
    const currentTheme = useTypeSelector(store => store.theme.themeType);
    const navigate = useNavigate();
    const createCourse = async () => {
        if (!name && !description) {
            setError("Все поля должны быть заполнены");
        } else {
            const data = await SBApi.withAuthorization(token as string).post<{courseId: string}>("course/add", {data: {name, description, language}});
            if (data.isOk) {
                setSuccessText(`Курс успешно создан, автоматический переход на страницу через ${timer} секунд`);
                setTimeout(() => {
                    navigate('/course/' + data.data);
                }, 5000);
            }
        }
    }

    return (
        <UnauthorizedPage>
            <Box>
                <Typography variant="h5" mb={1}>
                    Добро пожаловать в конструктор курсов. Создание курса проводится в 2 этапа: сначала придумай
                    название и
                    описание для своего будущего курса, затем можно проступить к созданию уровней.
                </Typography>
                <Card sx={{padding: 3}}>
                    <Typography variant="h6" mb={1}>
                        Придумай название для своего курса
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        error={!name && !!error}
                        label="Базовый курс по JS"
                        onChange={(e) => setName(e.target.value)}
                        sx={{marginBottom: 1}}
                    />
                    <Typography variant="h6" mt={3}>
                        Выбери язык программирования, про который хочешь составить курс
                    </Typography>
                    <Select
                        style={{width: 300}}
                        error={!language && !!error}
                        value={language}
                        onChange={(val) => setLanguage(val.target.value)}
                    >
                        <MenuItem value={1}>C#</MenuItem>
                    </Select>
                    {/*{"TODO: Убрать хардкод, переместить языки на сервер"}*/}
                    <Typography variant="body2" mt={3} mb={2}>
                        Далее, распиши о чем будет твой курс. Используй встроенную разметку, чтобы подчеркнуть важное
                        или
                        выделить код
                    </Typography>
                    <div data-color-mode={currentTheme}>
                        <MDEditor
                            value={description}
                            onChange={(val) => {
                                setDescription(val!);
                            }}
                        /></div>
                    <Typography variant="body2" mt={3} mb={2}>
                        Если описание готово, то нажимай на кнопку продолжить, чтобы начать добавлять уровни
                    </Typography>
                    <Button variant={"contained"} color={"primary"} onClick={createCourse}>Продолжить</Button>

                    {/*<div data-color-mode="light">*/}
                    {/*    <MDEditor.Markdown source={description}/>*/}
                    {/*</div>*/}
                </Card>
                <AlertHint closeHandler={() => {
                    setError("");
                }} severity={"error"} size={"small"} text={error} collapse={!!error}/>
                <AlertHint severity={"success"} size={"small"} text={successText} collapse={!!successText}/>
            </Box>
        </UnauthorizedPage>

    );
};
