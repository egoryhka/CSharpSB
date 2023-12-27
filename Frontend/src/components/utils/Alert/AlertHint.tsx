import React from 'react';
import {Alert, Box, Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {AlertColor} from "@mui/material/Alert/Alert";
import {OverridableStringUnion} from "@mui/types";
import {IconButtonPropsSizeOverrides} from "@mui/material/IconButton/IconButton";

interface AlertHintProps {
    collapse: boolean;
    severity: AlertColor;
    size: OverridableStringUnion<'small' | 'medium' | 'large', IconButtonPropsSizeOverrides>;
    text: string;
    closeHandler?: () => void;
    actionIcon?: React.ReactNode;
}

const AlertHint = ({collapse, severity, text, size, closeHandler, actionIcon}: AlertHintProps) => {
    return (
        <Box sx={{width: '100%'}}>
            <Collapse in={collapse}>
                <Alert
                    severity={severity}
                    action={closeHandler &&
                        <IconButton
                            aria-label="close"
                            color={severity}
                            size={size}
                            onClick={closeHandler}
                        >
                            {actionIcon ?? <CloseIcon fontSize="inherit"/>}
                        </IconButton>
                    }
                    sx={{mb: 2}}
                >
                    {text}
                </Alert>
            </Collapse>
        </Box>
    )

};

export default AlertHint;
