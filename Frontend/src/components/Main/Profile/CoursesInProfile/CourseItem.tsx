import React from 'react';
import {Link} from 'react-router-dom';
import {
    Avatar, Box, TableCell, TableRow, Typography,
} from "@mui/material";
import {getStringDate} from "../../../utils/dateParser/dateParser";
import {IFetchedCourses} from "../../../../api/ConferenceActions/getUsersConfs";
import {getRoleDescription} from "../../Courses/utils";

interface IConferenceProps {
    data: IFetchedCourses;
}

export const CourseItem: React.FC<IConferenceProps> = ({data}) => {

    return (
        <TableRow component={Link} to={`/course/${data.courseId}`}>
            <TableCell component="th" scope="row">
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar src={"c#"} />
                    <Typography ml={2} variant="body2">{data.name}</Typography>
                </Box>
            </TableCell>
            <TableCell align="center">{getRoleDescription(data.role)}</TableCell>
            <TableCell align="center">{getStringDate(data.startDate)}</TableCell>
            <TableCell align="right">{data.levelsComplete + "/" + data.levelCount}</TableCell>
        </TableRow>
    );
};
