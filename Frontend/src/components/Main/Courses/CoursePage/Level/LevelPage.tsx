import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {CheckCodeStatusTypes, CodeCheckResult, CourseLevelInfo, getBGColors, LevelStatus} from "../../utils";
import {Editor} from "@monaco-editor/react";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";
import {
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MDEditor from "@uiw/react-md-editor";
import SendIcon from "@mui/icons-material/Send";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import {LevelCodeError, LevelCodeResult} from "./LevelCode";
import {blue} from "@mui/material/colors";
import ForwardIcon from '@mui/icons-material/Forward';
import AlertHint from "../../../../utils/Alert/AlertHint";
import {CustomTooltip} from "../../../../utils/CustomTooltip/CustomTooltip";
import ReplyIcon from '@mui/icons-material/Reply';

export const LevelPage = () => {
    const theme = useTypeSelector(store => store.theme.currentTheme);
    const navigate = useNavigate();
    const SBApi = useContext(ApiProvider);
    const routeParams = useParams();
    const [loading, setLoading] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);
    const [code, setCode] = useState("");
    const [levelInfo, setLevelInfo] = useState<CourseLevelInfo | null>(null);
    const token = useTypeSelector(store => store.authUser.token);
    const currentTheme = useTypeSelector(store => store.theme.themeType);

    const [showResult, setShowResult] = useState(false);
    const [loadingResult, setLoadingResult] = useState(false);
    const [checkStatus, setCheckStatus] = useState<CodeCheckResult | null>(null);

    const [editMode, setEditMode] = useState(false);

    const userLoading = useTypeSelector(store => store.authUser.loading);

    // const goToLevel = async () => {
    //     navigate('/course/' + courseId + "/level/" + id);
    // } //TODO - тут остановился

    const color = useMemo(() => getBGColors(1), []);

    useEffect(() => {
        if (!userLoading) {
            void fetchLevelInfo();
        }
    }, [userLoading, routeParams.levelId]);

    useEffect(() => {


    });

    const fetchLevelInfo = async () => {
        setLoading(true);
        const data = await SBApi.withAuthorization(token as string).get<CourseLevelInfo>(`course/${routeParams?.courseId as string}/level/${routeParams?.levelId as string}`);
        if (data.isOk) {
            setLevelInfo(data.data);
            setCode(data.data.code || data.data.userCode || data.data.mainCode);
        }
        setLoading(false);
    }

    const sendCode = async () => {
        setLoadingResult(true);
        const data = await SBApi.withAuthorization(token as string).post<CodeCheckResult>(`game/test`, {
            data: {
                code: code,
                levelId: levelInfo?.id
            }
        });
        if (data.isOk) {
            setShowResult(true);
            setCheckStatus(data.data);
        }
        setLoadingResult(false);
    }

    const nextLevel = async () => {
        navigate(`/course/${levelInfo?.id}/level/${levelInfo?.next?.id ?? "2"}`)
    };

    const prevLevel = async () => {
        navigate(`/course/${levelInfo?.id}/level/${levelInfo?.prev?.id ?? "2"}`)
    };

    const getTip = async () => {
        setOpenHelp(prev => !prev);
    };

    const goToNextLevel = async () => {
        setLoadingResult(true);
        const data = await SBApi.withAuthorization(token as string).get<number>(`game/nextLevel/${levelInfo?.id}`);
        if (data.isOk) {
            navigate(`/course/${routeParams?.courseId}/level/${data.data}`);
            // window.location.reload();
            setLoading(false);
            setOpenHelp(false);
            setCheckStatus(null);
            setLoadingResult(false);
            setShowResult(false);
            setCode("");
        }
    }

    const goToCourse = async () => {
        navigate(`/course/${routeParams?.courseId}`)
    };

    const goToEditLevel = () => {
        navigate(`/course/${routeParams?.courseId}/level/${routeParams?.levelId}/edit`);
    };

    return (
        <>
            {levelInfo?.name ?
                <>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Tooltip title={"Предыдущий уровень"}>
                            <IconButton disabled={!levelInfo?.prev?.id} color={"primary"} size={"large"}
                                        onClick={() => prevLevel()}><KeyboardArrowLeftIcon/></IconButton>
                        </Tooltip>

                        <Typography variant={"h4"}>{levelInfo?.name}</Typography>

                        {levelInfo.levelStatus === LevelStatus.Admin &&
                            <Button onClick={goToEditLevel} variant={"contained"}>Редактировать</Button>}

                        <Tooltip title={"Следующий уровень"}>
                            <IconButton disabled={!levelInfo?.next?.id} color={"primary"} size={"large"}
                                        onClick={() => nextLevel()}><KeyboardArrowRightIcon/></IconButton>
                        </Tooltip>
                    </Box>
                    <Divider/>
                </>
                :
                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={45}/>
            }

            {levelInfo?.levelStatus === LevelStatus.Completed ?
                <AlertHint text={"Этот уровень уже пройден!"} collapse={true}
                           size={"medium"} severity={"success"} closeHandler={goToNextLevel}
                           actionIcon={<CustomTooltip
                               text={"Перейти на следующий уровень"}><ForwardIcon/></CustomTooltip>}/>
                : null}

            <br/>
            <br/>
            {levelInfo?.description ? <div data-color-mode={currentTheme}>
                    <MDEditor.Markdown source={levelInfo?.description}/>
                </div> :
                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={300}/>
            }
            <br/>
            <br/>

            {levelInfo ?
                <Card sx={{padding: 2}}>
                    <Typography variant={"h6"}>Впиши своё решение в редактор:</Typography>
                    <br/>
                    <br/>

                    {levelInfo.mainCode && levelInfo.userCode ?
                        <>
                            <Typography variant={"h6"}>Основной код, который должен выполнится</Typography>
                            <Editor height="200px" defaultLanguage="csharp" value={levelInfo.mainCode}
                                    options={{readOnly: true}}/>
                            <br/>
                            <Divider  />
                            <br/>
                            <Typography variant={"h6"}>Твой код</Typography>
                            <Editor height="200px" defaultLanguage="csharp" value={code}
                                    onChange={e => setCode(e ?? "")}/>
                        </> : <Editor height="200px" defaultLanguage="csharp" value={code}
                                      onChange={e => setCode(e ?? "")}/>
                    }


                    <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 2}}>
                        <Button startIcon={<SendIcon/>} onClick={sendCode} variant={"contained"}>Отправить на
                            проверку</Button>
                        <Tooltip
                            open={openHelp}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={getTip}
                            title={levelInfo.helpText}
                        >
                            <Button startIcon={<HelpCenterIcon/>} onClick={getTip} variant={"contained"}
                                    color={"info"}>{openHelp ? "Скрыть" : "Показать"} подсказку
                            </Button>
                        </Tooltip>

                    </Box>
                </Card>
                :
                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={300}/>
            }
            <br/>
            <br/>

            {showResult ?
                <Card sx={{padding: 2}}>
                    <Typography variant={"h6"}>Результат выполнения кода:</Typography>
                    <br/>
                    <br/>
                    {checkStatus?.status === CheckCodeStatusTypes.Error || checkStatus?.status === CheckCodeStatusTypes.Failure ?
                        <AlertHint text={"В коде допущены ошибки, исправь их и можно идти дальше"}
                                   collapse={true}
                                   size={"medium"} severity={"error"}/> : null}


                    {checkStatus?.errors.length ?
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontSize: 18, fontWeight: 600, color: blue[600]}}
                                                   align="center"
                                                   width={30}>№</TableCell>
                                        <TableCell sx={{fontSize: 18, fontWeight: 600, color: blue[600]}}
                                                   align="center">Ошибка</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {checkStatus?.errors.map((error, index) =>
                                        <LevelCodeError error={error} index={index + 1}/>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : null}
                    <br/>
                    <br/>
                    {checkStatus?.outputs.length ? <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontSize: 18, fontWeight: 600, color: blue[600]}}
                                               align="center"
                                               width={30}>№</TableCell>
                                    <TableCell sx={{fontSize: 18, fontWeight: 600, color: blue[600]}}
                                               align="center">Expected</TableCell>
                                    <TableCell sx={{fontSize: 18, fontWeight: 600, color: blue[600]}}
                                               align="center">Output</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {checkStatus?.outputs.map((status, index) =>
                                    <LevelCodeResult {...status} index={index + 1}/>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer> : null}
                    <br/>
                    <br/>
                    {checkStatus?.status === CheckCodeStatusTypes.Success ?
                        <Button onClick={goToNextLevel} variant={"contained"} size={"large"}>Следующий
                            уровень</Button> : null}
                </Card> : null}

            <Button startIcon={<ReplyIcon/>} onClick={goToCourse} variant={"contained"} size={"large"}>Вернуться на
                курс</Button>
            {/*<iframe*/}
            {/*    frameBorder="0"*/}
            {/*    height="450px"*/}
            {/*    src="https://sharplab.io/#v2:CYLg1APgAgTAjAWAFBQMwAJboMLoN7LpGYZQAs6AsgBQCU+hxTUcAnNQEQe0DcjTA9P3QBfZCKA="*/}
            {/*    width="100%">*/}
            {/*</iframe>*/}

        </>
    );
};