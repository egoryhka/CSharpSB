import {CodeCheckOutputResult, CourseLevelInfo, getBGColorByStatus, LevelStatus, Roles} from "../../utils";
import {Grid, TableCell, TableRow, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useTypeSelector} from "../../../../../utils/UseTypeSelector";

export const LevelCodeResult = ({real, expected, isCorrect, index}: CodeCheckOutputResult & { index: number }) => {
    const theme = useTypeSelector(store => store.theme.currentTheme);

    return (
        <TableRow sx={{backgroundColor: isCorrect ? theme.palette.success.light : theme.palette.error.light}}>
            <TableCell align="center"><Typography color={theme.palette.text.secondary}
                                                  variant={"h6"}>{index}</Typography></TableCell>
            <TableCell align="center" component="th"
                       scope="row"><Typography color={theme.palette.text.secondary}
                                               variant={"h6"}>{expected}</Typography></TableCell>
            <TableCell align="center"><Typography color={theme.palette.text.secondary}
                                                  variant={"h6"}>{real}</Typography></TableCell>
        </TableRow>
    );
};

export const LevelCodeError = ({error, index}: {error: string, index: number}) => {
    const theme = useTypeSelector(store => store.theme.currentTheme);

    return (
        <TableRow sx={{backgroundColor: theme.palette.error.light}}>
            <TableCell align="center"><Typography color={theme.palette.text.secondary}
                                                  variant={"h6"}>{index}</Typography></TableCell>
            <TableCell align="center" component="th"
                       scope="row"><Typography color={theme.palette.text.secondary}
                                               variant={"h6"}>{error}</Typography></TableCell>
        </TableRow>
    );
};
