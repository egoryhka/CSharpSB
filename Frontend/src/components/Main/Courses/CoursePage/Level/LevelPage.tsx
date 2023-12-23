import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {getBGColors} from "../../utils";
import {Grid, Typography} from "@mui/material";
import {Editor} from "@monaco-editor/react";

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
    const routeParams = useParams();
    console.log("routeParams", routeParams)

    // const goToLevel = async () => {
    //     navigate('/course/' + courseId + "/level/" + id);
    // } //TODO - тут остановился

    const color = useMemo(() => getBGColors(1), []);

    useEffect(() => {
        window.onmessage = function (e) {
            if (e.data && e.data.language) {
                console.log(e.data)
                // handle the e.data which contains the code object
            }
        }
    }, []);

    return (<>
            <br/>
            <br/>

            <Editor height="450px" defaultLanguage="csharp" defaultValue={startText}  />

            <iframe
                frameBorder="0"
                height="450px"
                src="https://onecompiler.com/embed/csharp?codeChangeEvent=true&hideTitle=true&hideNewFileOption=true&hideNew=true&hideLanguageSelection=true&hideStdin=true"
                width="100%">
            </iframe>

        </>
    );
};