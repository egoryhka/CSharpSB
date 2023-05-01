import React from 'react';
import {Fade, Tooltip} from "@mui/material";

interface CustomTooltipProps {
    text: string;
    children: React.ReactElement;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
    return (
        <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 600}} arrow
                 placement={"top"}
                 title={props.text}>
            {props.children}
        </Tooltip>
    );
};
