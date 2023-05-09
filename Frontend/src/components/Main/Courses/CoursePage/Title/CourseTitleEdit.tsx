import React, {useState} from 'react';
import {Box, Button, Divider, Grid, TextField, Typography} from "@mui/material";

interface ConferenceTitleProps {
    onSave?: () => void;
    name: string;
}

export const CourseTitleEdit: React.FC<ConferenceTitleProps> = ({onSave, name}) => {
    const [fixedName, _] = useState(name);
    return (
        <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"}>Редактирование курса: {fixedName}</Typography>
                <Button
                    onClick={onSave}
                    sx={{cursor: "pointer"}}
                    variant={"contained"}
                >
                    Сохранить
                </Button>
            </Box>
            <Divider/>
        </Grid>
    );
};
