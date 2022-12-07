import React, {useEffect, useState} from 'react';
import {Box, Divider, Typography} from "@mui/material";
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';

interface FullDescriptionProps {
    description?: string;
}

export const FullDescription: React.FC<FullDescriptionProps> = ({description}) => {
    return (
        <Box width={"100%"} mt={3}>
            <Divider variant={"fullWidth"}/>
            <Typography variant={"h4"}>Описание:</Typography>
            {description ? <>
                <Typography variant={"body1"}>{description}</Typography>
            </> : <Box sx={{alignItems: "center"}}>
                <EditLocationOutlinedIcon color="primary"/>
                <Typography variant={"body1"}>Кажется администратор конференции не добавил полного описания</Typography>
            </Box>}
        </Box>
    );
};
