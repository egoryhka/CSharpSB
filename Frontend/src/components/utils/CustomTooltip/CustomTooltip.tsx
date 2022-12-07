import React from 'react';
import {Fade, Tooltip} from "@mui/material";

interface CustomTooltipProps {
    text: string;
    children: React.ReactNode;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
    return (
        <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 600}} arrow
                 placement={"top"}
                 title={props.text}>
            {/*@ts-ignore ну че поделать*/}
            {props.children}
        </Tooltip>
    );
};
