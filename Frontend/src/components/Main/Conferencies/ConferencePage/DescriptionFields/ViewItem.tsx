import React from 'react';
import {Box, Typography} from "@mui/material";

interface ViewItemProps {
    title: string;
    info: string | undefined;
}

export const ViewItem = ({info, title}: ViewItemProps) => {
    if (!info) {
        return null;
    }

    return (
        <Box sx={{margin: 3}} component={'div'}>
            <Typography sx={{fontSize: "20px"}} variant={"body2"}>{title}</Typography>
            <Typography variant={"h5"}>{info}</Typography>
        </Box>
    );
};
