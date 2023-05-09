import {Box, MenuItem, Select, TextField, Typography} from '@mui/material';
import React, {useContext} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {UnauthorizedPage} from "../../../utils/Hooks/UnathorizedPage";
import {Forbidden} from "../../../utils/Errors/ErrorPages/Forbidden";
import {CourseTitleEdit} from "./Title/CourseTitleEdit";
import {ApiProvider} from "../../../../api/BaseResponse";


export default () => {
    const location = useLocation();

    const id = location?.state?.id;
    const canEdit = location?.state?.canEdit;
    const stateName = location?.state?.name;
    const steteDescription = location?.state?.description;
    const stateLanguage = location?.state?.language ?? "";

    const SBApi = useContext(ApiProvider);
    const token = useTypeSelector(store => store.authUser.token);

    const currentTheme = useTypeSelector(store => store.theme.themeType);

    const [description, setDescription] = React.useState(steteDescription);
    const [language, setLanguage] = React.useState(stateLanguage);
    const [name, setName] = React.useState(stateName);
    const [error, setError] = React.useState(stateName);
    const navigate = useNavigate();

    if (!canEdit || !id) {
        return <Forbidden />
    }

    const updateInfo = async () => {
        const data = await SBApi.withAuthorization(token as string).post<{courseId: string}>("course/update", {data: {name, description, language, id}});
        if (!data.isOk) {
            setError(data.fullError)
        }
        navigate("/course/" + id)
    }

    return (
        <UnauthorizedPage>
            <Box>
                <CourseTitleEdit onSave={updateInfo} name={name}></CourseTitleEdit>
                <TextField
                    required
                    value={name}
                    label="Название курса"
                    onChange={(e) => setName(e.target.value)}
                    sx={{marginBottom: 1}}
                />
                <Typography variant="h5" mb={1}>
                    Язык:
                </Typography>
                <Select
                    style={{width: 300}}
                    error={!language}
                    value={language}
                    onChange={(val) => setLanguage(val.target.value)}
                >
                    <MenuItem value={1}>C#</MenuItem>
                </Select>
                <Typography variant="body2" mt={3} mb={2}>
                    Описание курса
                </Typography>
                <div data-color-mode={currentTheme}>
                    <MDEditor
                        value={description}
                        onChange={(val) => {
                            setDescription(val!);
                        }}
                    />
                </div>
            </Box>
        </UnauthorizedPage>
    );
};


