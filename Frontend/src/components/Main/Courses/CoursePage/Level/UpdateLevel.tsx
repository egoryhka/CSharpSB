import {CourseLevelInfo, LevelStatus, startMainCode, userCode} from "../../utils";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {Box, Button, Card, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {UnauthorizedPage} from "../../../../utils/Hooks/UnathorizedPage";
import MDEditor from "@uiw/react-md-editor";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";
import AlertHint from "../../../../utils/Alert/AlertHint";
import {Editor} from "@monaco-editor/react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

const title = `\`\`\`jsx mdx:preview
const location = useLocation();
\`\`\`
`

export default () => {
    const userLoading = useTypeSelector(store => store.authUser.loading);
    const navigate = useNavigate();
    const location = useLocation();
    const currentTheme = useTypeSelector(store => store.theme.themeType);
    const SBApi = useContext(ApiProvider);
    const token = useTypeSelector(state => state.authUser.token);

    const [description, setDescription] = React.useState(title);
    const [name, setName] = React.useState("");
    const [id, setId] = React.useState(0);
    // const [compileResult, setCompileResult] = React.useState("");
    const [helpText, setHelpText] = React.useState("");

    const [error, setError] = React.useState("");

    const [mainCodeValue, setMainCodeValue] = useState<string | undefined>(startMainCode);
    const [userCodeValue, setUserCodeValue] = useState<string | undefined>(userCode);
    const [resultOutputCode, setResultOutputCode] = useState<{ order: number, value: string }[]>([{
        order: 0,
        value: "Hello World!"
    }]);

    const [levelInfo, setLevelInfo] = useState<CourseLevelInfo | null>(null);

    const routeParams = useParams();
    console.log("routeParams", routeParams);

    useEffect(() => {
        if (!userLoading) {
            void fetchLevelInfo();
        }
    }, [userLoading, routeParams.levelId]);

    const [loading, setLoading] = useState(false);

    const fetchLevelInfo = async () => {
        setLoading(true);
        const data = await SBApi.withAuthorization(token as string).get<CourseLevelInfo>(`course/${routeParams?.courseId as string}/level/${routeParams?.levelId as string}`);
        if (data.isOk) {
            if (data.data.levelStatus !== LevelStatus.Admin) {
                navigate(`/permissiondenied`);
            } else {
                setLevelInfo(data.data);
                setHelpText(data.data.helpText);
                setMainCodeValue(data.data.mainCode);
                setUserCodeValue(data.data.userCode);
                setName(data.data.name);
                setDescription(data.data.description);
                setId(data.data.id);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!userLoading) {
            void fetchLevelInfo();
        }
    }, [userLoading, routeParams.levelId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            const executeResult = JSON.stringify(resultOutputCode
                .sort(o => o.order)
                .map(o => o.value));
            const data = await SBApi.withAuthorization(token).post(`course/${routeParams.courseId}/level/update`,
                {data: {name, description, helpText, compileResult: executeResult, mainCode: mainCodeValue, userCode: userCodeValue, id: id}});
            if (data.isOk) {
                navigate('/course/' + routeParams.courseId);
            }
            setError(data.fullError);
        }
    }

    const setOutputCode = (order: number, value: string) => {
        setResultOutputCode(prev => prev.map(o => {
            if (o.order === order) {
                return {order, value}
            } else return o;
        }))
    }

    const removeOutputCode = (order: number) => {
        setResultOutputCode(prev => prev.filter(o => o.order !== order));
    }

    const addOutputCode = () => {

        setResultOutputCode(prev => {
            debugger
            const order = prev?.length ? (prev[prev.length - 1]?.order ?? 0) + 1 : 0;
            return [...prev, {
                order: order,
                value: ""
            }];
        })
    }

    return (
        <UnauthorizedPage>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant={"h4"}>Редактирование уровня</Typography>
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
                    />
                </div>

                <br/>
                <br/>
                <Card style={{marginTop: 16, padding: 8}}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography sx={{marginBottom: 2}} variant={"h6"}>Результат компиляции для
                            уровня</Typography>
                        <Button startIcon={<AddBoxIcon/>} color={"success"} size={"large"}
                                onClick={() => addOutputCode()}/>
                    </Box>
                    {resultOutputCode.map(o => {
                        return (<>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: 1
                                }}>
                                    <Button startIcon={<DeleteIcon/>} color={"error"} size={"large"}
                                            onClick={() => removeOutputCode(o.order)}/>
                                    <TextField
                                        size={"small"}
                                        label="Например: [1, 2, 3]"
                                        value={o.value}
                                        onChange={e => setOutputCode(o.order, e.target.value)}
                                        autoComplete="levelname"
                                        fullWidth
                                        required
                                    />
                                </Box>
                            </>
                        )
                    })}
                </Card>

                <br/>
                <br/>
                <Card style={{marginTop: 2}}>
                    <Typography sx={{margin: 2}} variant={"h6"}>Основной код, который нужно
                        прогнать
                        для прохождения уровня {" "}
                        <Link to={"/wiki/maincode"}>
                            Как это работает?
                        </Link>
                    </Typography>
                    <Editor height="180px" defaultLanguage="csharp" value={mainCodeValue}
                            onChange={(e) => setMainCodeValue(e)}
                            options={{scrollbar: {vertical: "hidden"}}}/>
                </Card>

                <Card style={{marginTop: 2}}>
                    <Typography sx={{margin: 2}} variant={"h6"}>Стартовый пользовательский
                        код {" "}
                        <Link to={"/wiki/usercode"}>
                            Как это работает?
                        </Link>
                    </Typography>
                    <Editor height="180px" defaultLanguage="csharp" value={userCodeValue}
                            onChange={(e) => setUserCodeValue(e)}
                            options={{scrollbar: {vertical: "hidden"}}}/>
                </Card>

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
                <Button sx={{marginBottom: 2, marginTop: 2}} type={"submit"} variant={"contained"}>Сохранить
                    уровень</Button>

                <AlertHint severity={"error"} size={"small"} text={error} collapse={!!error}/>
            </Box>
        </UnauthorizedPage>
    );
};
