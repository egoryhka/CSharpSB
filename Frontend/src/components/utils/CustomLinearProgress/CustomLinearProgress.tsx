import React from 'react';
import {Box, LinearProgress} from "@mui/material";

interface Props {
    submitLoading: boolean;
}

export const CustomLinearProgress: React.FC<Props> = ({submitLoading}) => {
    if (submitLoading) {
        return <Box sx={{width: '100%'}} mt={1} mb={1}>
            <LinearProgress/>
        </Box>
    }
    return null;
};
