import React from 'react';
import {
    useFetchTimeLineConfs
} from "../../api/ConferenceTimeLine/getConferencesTimeLine";
import {Loader} from "../utils/Loader/Loader";
import AlertHint from "../utils/Alert/AlertHint";
import {TimeLineView} from "./TimeLineView/TimeLineView";
import {Typography} from "@mui/material";

export const HomePage = () => {
    const {timeLine, loading, error} = useFetchTimeLineConfs();
    return (
        <div>
            <Typography variant={"h4"} component={"h5"}>Стартовая страница (дайте текста)</Typography>
            {loading ? <Loader text={"Загружаем конференции"}/> : null}
            <AlertHint
                collapse={Boolean(error)}
                text={error}
                size={"small"}
                severity={"error"}/>
            {timeLine.length > 0
                ? <TimeLineView timeLine={timeLine} />
                : null}
        </div>
    );
};


