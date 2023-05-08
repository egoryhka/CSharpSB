import Box from '@mui/material/Box';
import React, {useEffect, useState} from 'react';
import {useFetchUsersConfs} from "../../../../api/ConferenceActions/getUsersConfs";
import {Loader} from "../../../utils/Loader/Loader";
import {ConferenceItem} from "./ConferenceItem";
import {
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import AlertHint from "../../../utils/Alert/AlertHint";

interface ConferenciesContainerProps {
    userId: string;
}

export const CoursesContainer: React.FC<ConferenciesContainerProps> = ({userId}) => {
    const [page, setPage] = useState<number>(1);
    const {courses, loading, error, message, totalPages, totalConfs} = useFetchUsersConfs(page, userId);

    const handlePagination = (_: React.ChangeEvent<unknown>, nextPage: number) => {
        if (page === nextPage) return;
        setPage(nextPage);
    }

    return <Box sx={{
        borderRadius: 2,
        boxShadow: "0px 0px 15px 0px rgba(34, 60, 80, 0.15)",
        padding: 2,
        width: "100%",
        boxSizing: "border-box"
    }}>
        <Typography variant={'h6'}>Всего курсов: {totalConfs}</Typography>
        {error && <AlertHint text={error} size={"small"} collapse={Boolean(error)} severity={"error"}/>}
        {message && <AlertHint text={message} size={"small"} collapse={Boolean(error)} severity={"warning"}/>}

        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell align="center">Статус</TableCell>
                        <TableCell align="center">Дата начала</TableCell>
                        <TableCell align="right">Участники</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? <Loader text="Подгружаем курсы"/> :
                        courses.map(course => <ConferenceItem key={course.name + Math.random()}
                                                                data={course}/>)}
                </TableBody>
            </Table>
        </TableContainer>

        <Stack spacing={2}>
            <Pagination sx={{margin: "10px auto"}} count={totalPages} variant="outlined" color="primary" page={page}
                        onChange={handlePagination}/>
        </Stack>
    </Box>;
};
