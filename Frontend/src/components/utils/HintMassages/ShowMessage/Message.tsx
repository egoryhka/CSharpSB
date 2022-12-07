import { Typography } from '@mui/material';
import React from 'react';

interface MessageProps {
    text: string;
    type: "error" | "warning";
}

export const Message: React.FC<MessageProps> = ({text, type}) => {
    return (
        <Typography variant={"h5"} color={type === "error" ? "error" : "warning"} >{text}</Typography>
    );
};
