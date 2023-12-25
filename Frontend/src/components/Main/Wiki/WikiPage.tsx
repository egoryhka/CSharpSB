import React from 'react';
import {Divider, Grid, Typography} from "@mui/material";
import {wiki, WikiModel} from "./utils";
import {Navigate, useParams} from "react-router-dom";

export default () => {
    const routeParams = useParams();
    const info = wiki.find(w => w.id === routeParams?.id) as WikiModel;
    if (!info.content && !info.title) {
        return <Navigate replace to={"/notfound"}/>;
    }
    return (
        <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
            <Typography variant={"h4"}>{info.title}</Typography>
            <Divider/>
            <br/>
            <br/>
            {info.content}
            <Divider/>
        </Grid>
    );
};
