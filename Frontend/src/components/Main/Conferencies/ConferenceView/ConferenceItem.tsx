import React from 'react';
import {ConferenceInfo} from "../../../../redux/types/conferencies/conference";
import {Link} from 'react-router-dom';
import {
    Avatar,
    AvatarGroup, Box, TableCell, TableRow, Typography,
} from "@mui/material";
import {getStringDate} from "../../../utils/dateParser/dateParser";
import {stringToColor} from "../../../utils/StringToColor/StringToColor";
import {CustomTooltip} from "../../../utils/CustomTooltip/CustomTooltip";

interface IConferenceProps {
    data: ConferenceInfo;
}

export const ConferenceItem: React.FC<IConferenceProps> = ({data}) => {

    return (
        <TableRow component={Link} to={`/conferencepage/${data.partyPageLink}`}>
            <TableCell component="th" scope="row">
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar src={data.logo} />
                    <Typography ml={2} variant="body2">{data.name}</Typography>
                </Box>
            </TableCell>
            <TableCell align="center">Статус: </TableCell>
            <TableCell align="center">{getStringDate(data.startDate)}</TableCell>
            <TableCell align="right"><AvatarGroup total={data.totalUsersCount}>
                {data.participants.map(user =>
                    <Avatar>
                        <CustomTooltip text={user.email} >
                            <Link to={`/userprofile/${user.userid}`}>
                                <Avatar alt={user.email} src={user.logo} sx={{bgcolor: stringToColor(user.email)}}/>
                            </Link>
                        </CustomTooltip>
                    </Avatar>
                )}
            </AvatarGroup></TableCell>
        </TableRow>
    );
};
