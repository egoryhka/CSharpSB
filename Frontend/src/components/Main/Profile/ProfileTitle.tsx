import React from 'react';
import {Box, Divider, Grid, Link, Typography} from "@mui/material";
import Edit from "@mui/icons-material/Edit";

interface ProfileTitleProps {
    name: string;
    setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
    editModeExist?: boolean;
}

export const ProfileTitle: React.FC<ProfileTitleProps> = ({setEditMode, name, editModeExist}) => {
    return (
        <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"}>{name}</Typography>
                {(editModeExist && typeof setEditMode === "function") ?
                    <Link sx={{cursor: "pointer"}} variant={"h5"} onClick={() => setEditMode(prev => !prev)}
                          underline="hover">
                        Редактировать<Edit/>
                    </Link> : undefined
                }
            </Box>
            <Divider/>
        </Grid>
    );
};
