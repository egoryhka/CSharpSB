import React from 'react';
import {Link} from 'react-router-dom';
import {
    Avatar,
    AvatarGroup, Box, TableCell, TableRow, Typography,
} from "@mui/material";
import {getStringDate} from "../../../utils/dateParser/dateParser";
import {IFetchedCourses} from "../../../../api/ConferenceActions/getUsersConfs";

interface IConferenceProps {
    data: IFetchedCourses;
}

export const ConferenceItem: React.FC<IConferenceProps> = ({data}) => {

    return (
        <TableRow component={Link} to={`/course/${data.courseId}`}>
            <TableCell component="th" scope="row">
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar src={"c#"} />
                    <Typography ml={2} variant="body2">{data.name}</Typography>
                </Box>
            </TableCell>
            <TableCell align="center">Статус: </TableCell>
            <TableCell align="center">{getStringDate(data.startDate)}</TableCell>
        </TableRow>
    );
};
