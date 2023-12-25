import React from 'react';
import {Box, Typography} from "@mui/material";
import {startUserCode} from "../../Courses/utils";
import {Editor} from "@monaco-editor/react";

export const MainCode = () => {
    return (<>
        <Box style={{margin: 2}}>
            <Typography variant={"body2"}>Для того что бы описать прогоняемый код, достаточно
                представить что обертка уже есть и писать код нужно только в месте, где стоит
                <br/>
                <br/>
                <Typography variant={"body1"}>
                //Пишите код вот сюда;
                </Typography>
                <br/>
                Все обертки в виде using применятся автоматически к компилятору.
            </Typography>
        </Box>

        <Editor defaultValue={startUserCode} height="350px" defaultLanguage="csharp"/>
    </>);
};
