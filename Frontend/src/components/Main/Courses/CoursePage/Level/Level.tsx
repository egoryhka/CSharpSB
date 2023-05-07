import {CourseLevelInfo, getBGColors, getLinkLevelText, Roles} from "../../utils";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {Loader} from "../../../../utils/Loader/Loader";
import {Box, Button, Card, Divider, Grid, Typography} from "@mui/material";
import {useContext, useEffect, useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

interface LevelProps extends CourseLevelInfo {
    courseId?: string;
}

export const Level = ({id, name, description, helpText, order, courseId}: LevelProps) => {
    console.log(id, name, description, helpText, order)
    const navigate = useNavigate();

    const goToLevel = async () => {
        navigate('/course/' + courseId + "/level/" + id);
    }

    const color = useMemo(() => getBGColors(1), []);

    return (
        <Grid item lg={3} xs={5} onClick={goToLevel} sx={{
            marginBottom: 2,
            marginRight: 2,
            border: `3px solid ${color}`,
            borderRadius: "16px",
            cursor: "pointer",
            padding: 2,
            transition: "all .5s ease",
            ":hover": {
                backgroundColor: color,
                opacity: 0.6,
            }
        }}>
            <Typography variant={"h6"}>{order + ". " + name}</Typography>
        </Grid>
    );
};
