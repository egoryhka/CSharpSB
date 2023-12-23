import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useMemo, useState} from "react";
import {CourseInfo, CourseLevelInfo, getBGColors} from "../../utils";
import {Grid, Typography} from "@mui/material";
import {Editor} from "@monaco-editor/react";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {delay} from "../../../../utils/Delay/Delay";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";

const startText = `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace HelloWorld
{
\tpublic class Program
\t{
\t\tpublic static void Main(string[] args)
\t\t{
\t\t\tConsole.WriteLine("Hello, World!");
\t\t}
\t}
}`

export const LevelPage = () => {
    const navigate = useNavigate();
    const SBApi = useContext(ApiProvider);
    const routeParams = useParams();
    const [loading, setLoading] = useState(false);
    const [levelInfo, setLevelInfo] = useState<CourseLevelInfo | null>(null);
    const token = useTypeSelector(store => store.authUser.token);

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
        //     if (e.data && e.data.language) {
        //         console.log(e.data)
        //         // handle the e.data which contains the code object
        //     }
        // }
    }, [userLoading]);

    const fetchLevelInfo = async () => {
        setLoading(true);
        const data = await SBApi.withAuthorization(token as string).get<CourseLevelInfo>(`course/${routeParams?.courseId as string}/level/${routeParams?.levelId as string}`);
        if (data.isOk) {
            setLevelInfo(data.data)
        }
        setLoading(false);
    }

    return (
        <>
            <br/>
            <br/>
            <Editor height="450px" defaultLanguage="csharp" defaultValue={startText}/>
            {/*<iframe*/}
            {/*    frameBorder="0"*/}
            {/*    height="450px"*/}
            {/*    src="https://onecompiler.com/embed/csharp?codeChangeEvent=true&hideTitle=true&hideNewFileOption=true&hideNew=true&hideLanguageSelection=true&hideStdin=true"*/}
            {/*    width="100%">*/}
            {/*</iframe>*/}

        </>
    );
};