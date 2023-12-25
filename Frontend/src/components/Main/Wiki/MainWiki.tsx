import React from 'react';
import {Card, Divider, Grid, Typography} from "@mui/material";
import {wiki} from "./utils";
import {Link} from "react-router-dom";

export default () => {
    return (
        <Grid item lg={12} xs={12} sx={{marginBottom: 3}}>
            <Typography variant={"h4"}>База знаний по использованию сервиса обучения программированию</Typography>
            <Typography variant={"h6"}>Кликай на интерисующую ссылку с описанием работы</Typography>
            {wiki.map((info, index) => {
                return <Card style={{margin:16, padding: 16}}>
                    <Link style={{fontSize:20}} to={`/wiki/${info.id}`}>{`${index + 1}. `}{info.title}</Link>
                </Card>
            })}
            <Divider/>
        </Grid>
    );
};
