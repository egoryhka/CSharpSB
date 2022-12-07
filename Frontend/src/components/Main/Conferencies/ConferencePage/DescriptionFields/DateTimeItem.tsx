import React, {useMemo} from 'react';
import {Box, Typography} from "@mui/material";

interface DataItemProps {
    title: string;
    date?: string;
}

export const DateTimeItem = ({date, title}: DataItemProps) => {
    if (!date) {
        return null;
    }
    const parsedDate = new Date(date).toLocaleDateString();
    return (
        <Box sx={{margin: 3}} component={'div'}>
            <Typography sx={{fontSize: "20px"}} variant={"body2"}>{title}</Typography>
            <Typography variant={"h5"}>{parsedDate}</Typography>
        </Box>
    );
};
