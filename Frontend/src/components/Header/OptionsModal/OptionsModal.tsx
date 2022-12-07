import React from 'react';
import {Divider, Paper, Stack, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface OptionModalProps {
    onClose: (e: React.MouseEvent) => void;
    modalTransform: boolean;
}

export const OptionsModal: React.FC<OptionModalProps> = ({onClose, modalTransform}) => {
    return (
        <Paper onClick={onClose} sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,.3)",
            zIndex: 9999
        }}>
            <Paper onClick={e => e.stopPropagation()} className={modalTransform ? "modal-transform-open" : "modal-transform-close"} sx={{
                backgroundColor: (theme) => `${theme.palette.background}`,
                width: 400,
                p: 2,
                position: "absolute",
                right: 0,
                top: 0,
                transition: "all .3s ease",
                height: "100%",
            }}>

                <Stack direction='row' justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Настройки</Typography>
                    <Typography><CloseIcon/></Typography>
                </Stack>
                <Divider variant={"fullWidth"}/>
            </Paper>
        </Paper>
    );
};
{
}
