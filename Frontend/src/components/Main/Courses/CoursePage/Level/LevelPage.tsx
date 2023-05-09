import {useNavigate, useParams} from "react-router-dom";
import {useMemo} from "react";
import {getBGColors} from "../../utils";
import {Grid, Typography} from "@mui/material";

export const LevelPage = () => {
    const navigate = useNavigate();
    const routeParams = useParams();
    console.log("routeParams", routeParams)

    // const goToLevel = async () => {
    //     navigate('/course/' + courseId + "/level/" + id);
    // } //TODO - тут остановился

    const color = useMemo(() => getBGColors(1), []);

    return (
            <Typography variant={"h6"}>Жду бекенд. тут много чего надо обсудить</Typography>
    );
};