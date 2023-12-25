import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {CourseInfo, CourseLevelInfo, getBGColors, getLinkText, getRoleDescription, startUserCode} from "../../utils";
import {Editor} from "@monaco-editor/react";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";
import {Box, Button, Card, Divider, IconButton, Skeleton, Tooltip, Typography} from "@mui/material";
import {ProfileTitle} from "../../../Profile/ProfileTitle";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from "@mui/icons-material/Delete";
import MDEditor from "@uiw/react-md-editor";
import {TypeSpecimen} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';


export const LevelPage = () => {
    const navigate = useNavigate();
    const SBApi = useContext(ApiProvider);
    const routeParams = useParams();
    const [loading, setLoading] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);
    const [code, setCode] = useState("");
    const [levelInfo, setLevelInfo] = useState<CourseLevelInfo | null>(null);
    const token = useTypeSelector(store => store.authUser.token);
    const currentTheme = useTypeSelector(store => store.theme.themeType);

    const userLoading = useTypeSelector(store => store.authUser.loading);

    console.log("routeParams", routeParams);

    // const goToLevel = async () => {
    //     navigate('/course/' + courseId + "/level/" + id);
    // } //TODO - тут остановился

    const color = useMemo(() => getBGColors(1), []);

    useEffect(() => {
        if (!userLoading) {
            void fetchLevelInfo();
        }

        // window.onmessage = function (e) {
        //     console.log(e)
        //     if (e.data && e.data.language) {
        //         console.log(e.data)
        //         // handle the e.data which contains the code object
        //     }
        // }
    }, [userLoading]);

    useEffect(() => {


    });

    const fetchLevelInfo = async () => {
        setLoading(true);
        const data = await SBApi.withAuthorization(token as string).get<CourseLevelInfo>(`course/${routeParams?.courseId as string}/level/${routeParams?.levelId as string}`);
        if (data.isOk) {
            setLevelInfo(data.data);
            setCode(data.data.code ?? data.data.userCode ?? data.data.mainCode);
        }
        setLoading(false);
    }

    const sendCode = async () => {
        const data = await SBApi.withAuthorization(token as string).post<CourseLevelInfo>(`game/test`, {
            data: {
                code: code,
                levelId: levelInfo?.id
            }
        });
    }

    const nextLevel = async () => {
        navigate(`/course/${levelInfo?.id}/level/${levelInfo?.nextLevelId ?? "2"}`)
    };

    const prevLevel = async () => {
        navigate(`/course/${levelInfo?.id}/level/${levelInfo?.prevLevelId ?? "2"}`)
    };

    const getTip = async () => {
        setOpenHelp(prev => !prev);
    };

    return (
        <>
            {levelInfo?.name ?
                <>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Tooltip title={"Предыдущий уровень"}>
                            <IconButton disabled={!levelInfo?.prevLevelId} color={"primary"} size={"large"}
                                        onClick={() => prevLevel()}><KeyboardArrowLeftIcon/></IconButton>
                        </Tooltip>

                        <Typography variant={"h4"}>{levelInfo?.name}</Typography>

                        <Tooltip title={"Следующий уровень"}>
                            <IconButton disabled={!levelInfo?.nextLevelId} color={"primary"} size={"large"}
                                        onClick={() => nextLevel()}><KeyboardArrowRightIcon/></IconButton>
                        </Tooltip>
                    </Box>
                    <Divider/>
                </>
                :
                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={45}/>
            }
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
                    <Editor height="200px" defaultLanguage="csharp" value={code} onChange={e => setCode(e ?? "")}/>
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

            {/*<iframe*/}
            {/*    frameBorder="0"*/}
            {/*    height="450px"*/}
            {/*    src="https://sharplab.io/#v2:CYLg1APgAgTAjAWAFBQMwAJboMLoN7LpGYZQAs6AsgBQCU+hxTUcAnNQEQe0DcjTA9P3QBfZCKA="*/}
            {/*    width="100%">*/}
            {/*</iframe>*/}

        </>
    );
};