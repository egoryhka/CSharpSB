import {CourseLevelInfo, getBGColors, getLinkLevelText, Roles} from "../../utils";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {Loader} from "../../../../utils/Loader/Loader";
import {Box, Button, Card, Divider, Grid, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {UnauthorizedPage} from "../../../../utils/Hooks/UnathorizedPage";
import MDEditor from "@uiw/react-md-editor";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";
import AlertHint from "../../../../utils/Alert/AlertHint";

const title = `\`\`\`jsx mdx:preview
const location = useLocation();
\`\`\`
`

export default () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTheme = useTypeSelector(store => store.theme.themeType);
    const SBApi = useContext(ApiProvider);
    const token = useTypeSelector(state => state.authUser.token);

    const [description, setDescription] = React.useState(title);
    const [name, setName] = React.useState("");
    const [compileResult, setCompileResult] = React.useState("");
    const [helpText, setHelpText] = React.useState("");

    const [error, setError] = React.useState("");

    const canAdd = location?.state?.authorized;
    const courseId = location?.state?.courseId;
    const courseName = location?.state?.courseName;

    if (!canAdd || !courseId) {
        return <Navigate to={'/permissiondenied'}/>
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            const data = await SBApi.withAuthorization(token).post(`course/${courseId}/level/add`,
                {data: {name, description, helpText, compileResult}});
            if (data.isOk) {
                navigate('/course/' + courseId);
            }
            setError(data.fullError);
        }
    }

    return (
        <UnauthorizedPage>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant={"h4"}>Добавление уровня на курс: {courseName}</Typography>
                <TextField
                    label="Название для уровня"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    required
                    sx={{marginBottom: 2, marginTop: 2}}
                />
                <Typography variant={"body1"}>Описание для уровня</Typography>
                <div data-color-mode={currentTheme}>
                    <MDEditor
                        value={description}
                        onChange={(val) => {
                            setDescription(val!);
                        }}
                    /></div>
                <Typography sx={{marginBottom: 2, marginTop: 2}} variant={"body1"}>Результат компиляции для
                    уровня</Typography>
                <TextField
                    label="Например: [1, 2, 3]"
                    value={compileResult}
                    onChange={e => setCompileResult(e.target.value)}
                    autoComplete="levelname"
                    fullWidth
                    required
                />
                <Typography sx={{marginBottom: 2, marginTop: 2}} variant={"body1"}>Подсказка по уровню,
                    опционально</Typography>
                <TextField
                    label="Например: воспользуйся методом FindFirst у структуры IEnumerable"
                    value={helpText}
                    onChange={e => setHelpText(e.target.value)}
                    autoComplete="levelname"
                    fullWidth
                    required
                />
                <Button sx={{marginBottom: 2, marginTop: 2}} type={"submit"} variant={"contained"}>Добавить
                    уровень</Button>

                <AlertHint severity={"error"} size={"small"} text={error} collapse={!!error}/>
            </Box>
        </UnauthorizedPage>
    );
};
