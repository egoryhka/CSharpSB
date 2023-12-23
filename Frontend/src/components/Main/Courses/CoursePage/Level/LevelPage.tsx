import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
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

    useEffect(() => {
        window.onmessage = function (e) {
            if (e.data && e.data.language) {
                console.log(e.data)
                // handle the e.data which contains the code object
            }
        }
    }, []);

    return (<>
            <br/>
            <br/>
            <iframe
                frameBorder="0"
                height="450px"
                src="https://onecompiler.com/embed/csharp?codeChangeEvent=true&hideTitle=true&hideNewFileOption=true&hideNew=true&hideLanguageSelection=true&hideStdin=true"
                width="100%">
            </iframe>
            ;
        </>
    );
};