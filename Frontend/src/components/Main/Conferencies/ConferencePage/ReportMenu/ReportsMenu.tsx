import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {roles} from "../../../../utils/LinkTextFromRole/LinkTextFromRole";
import {
    getReportInfoRequest, removeReportRequest,
    ReportInfo,
    sendReport
} from "../../../../../api/ConferenceActions/ReportsActions";
import {IResponceStatuses} from "../../../../utils/ResponceStatuses/ReaponceIntertface";
import AlertHint from "../../../../utils/Alert/AlertHint";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";
import {ReportStatuses} from "./ReportStatusItem";

interface ReportsMenuProps {
    roles: roles;
    confId: string;
}

export const ReportsMenu: React.FC<ReportsMenuProps> = ({roles, confId}) => {
    const [respStatus, setRespStatus] = useState<IResponceStatuses>({});
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [reports, setReports] = useState<ReportInfo>({reports: [], statuses: []});
    const email = useTypeSelector(store => store.authUser.email);

    useEffect(() => {
        if (email) {
            void getReportInfo()
        }
    }, [email, respStatus, respStatus.info, respStatus.isError, respStatus.isOk]);

    const getReportInfo = async () => {
        const data = await getReportInfoRequest(confId);
        setReports(data);
    }

    const sendReportHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setDisableButton(true);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const responce = await sendReport(formData);
        setRespStatus(responce);
    }

    const removeReport = async () => {
        setDisableButton(true);
        const responce = await removeReportRequest(confId);
        setRespStatus(responce);
    }

    return (
        <Box mt={4} padding={2} paddingTop={1} sx={{
            borderRadius: 2,
            boxShadow: "0px 0px 15px 0px rgba(34, 60, 80, 0.15)",
            width: "100%",
            boxSizing: "border-box"
        }}>
            {roles.isListener && <Box component={"form"} onSubmit={sendReportHandler}>
                <Typography variant="h6">Хотите стать докладчиком на конференции?</Typography>
                <Typography variant="body2">Приложите свой доклад и кратко напишите нам о чем он. Эксперты проверят и
                    оставят вам обратную связь</Typography>
                <Grid container spacing={2} minWidth={260} maxWidth={500}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            maxRows={3}
                            label="Название доклада"
                            name={"ReportName"}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            maxRows={3}
                            multiline
                            label="Краткое описание доклада"
                            name={"ReportDescription"}
                            variant="standard"
                        />
                    </Grid>
                    <Grid sx={{margin: "24px 0"}} item md={12} xs={12}>
                        <Typography>
                            Приложите свой доклад: <input type="file"
                                                          accept=".doc,.docx,.pdf,application/msword"
                                                          name={"Doc"} id="fAQDoc"/>
                        </Typography>
                        <Divider/>
                    </Grid>
                    <input type="hidden" name={"conference"} value={confId}/>
                </Grid>
                <Button disabled={disableButton} variant={"contained"} type={'submit'}>Отправить</Button>
            </Box>}

            {(roles.isSpeaker && reports.reports && reports.reports[0]) && <Box>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant="h6">Ваш доклад: {reports.reports[0].reportName}</Typography>
                    <Button disabled={disableButton} variant={"contained"} onClick={removeReport}>Удалить
                        доклад</Button>
                </Box>

                <Typography variant="body2">Краткое описание: {reports.reports[0].description}</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Исполнитель</TableCell>
                                <TableCell align="center">Статус</TableCell>
                                <TableCell align="center">Дата</TableCell>
                                <TableCell align="center">Информация</TableCell>
                                <TableCell align="center">Доклад</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reports.statuses[0] && reports.statuses.map(status => <ReportStatuses {...status} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>}

            {respStatus.info &&
            <AlertHint collapse={Boolean(respStatus.info)} severity={respStatus.isError ? "error" : "success"}
                       size={"small"}
                       text={respStatus.info}/>}
        </Box>);
};
