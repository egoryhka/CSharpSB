import React from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";

interface LoaderProps {
    text: string;
}

export const Loader = (props: LoaderProps) => {
    return (
        <Box
            sx={{display: "grid", justifyContent: "center", justifyItems: "center", height: "300px"}}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Typography sx={{marginBottom: "24px"}} variant={"h4"}>{props.text}</Typography>
                <CircularProgress size={56}/>
            </Box>
        </Box>
    );
};
