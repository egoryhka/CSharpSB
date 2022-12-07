import React from "react";
import {IReportStatus} from "../../../../../api/ConferenceActions/ReportsActions";
import {Avatar, Box, Link, TableCell, TableRow, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LensIcon from '@mui/icons-material/Lens';
import {stringToColor} from "../../../../utils/StringToColor/StringToColor";

export const ReportStatuses: React.FC<IReportStatus> = ({status, expertId, expertLogo, expertName, feedback, date, docLink}) => {
    const getStatusText = () => {
        switch (status) {
            case "1":
                return "Отправлен";
            case "5":
                return "Отправлен повторно";
            case "2":
                return "Принят";
            case "3":
                return "Вернут на доработку";
            case "4":
                return "Отклонен";
            default:
                return "Неизвестен"
        }
    }
    const getStatusColor = () => {
        switch (status) {
            case "1":
                return "info";
            case "5":
                return "info";
            case "2":
                return "success";
            case "3":
                return "warning";
            case "4":
                return "error";
            default:
                return "error"
        }
    }
    const textStatus = getStatusText();
    const textColor = getStatusColor();

    return (<TableRow>
        <TableCell component="th" scope="row">
            <RouterLink to={`/userprofile/${expertId}`}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar sx={{bgcolor: stringToColor(expertName)}} src={expertLogo}/>
                    <Typography ml={2} variant="body2">{expertName}</Typography>
                </Box>
            </RouterLink>
        </TableCell>
        <TableCell align="center">
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <LensIcon fontSize="small" color={textColor}/>
                <Typography ml={1} variant="body2">{textStatus}</Typography>
            </Box>
        </TableCell>
        <TableCell align="center">{new Date(date).toLocaleString()}</TableCell>
        <TableCell align="center">{feedback || "Нет"}</TableCell>
        <TableCell align="right">
            <Typography>
                <Link href={docLink}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <UploadFileIcon/>
                        <Typography ml={0.5} variant="body2">Скачать</Typography>
                    </Box>
                </Link>
            </Typography>
        </TableCell>
    </TableRow>)
}
