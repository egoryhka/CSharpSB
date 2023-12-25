import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useMemo, useState} from "react";
import {CourseInfo, CourseLevelInfo, getBGColors, startUserCode} from "../../utils";
import {Editor} from "@monaco-editor/react";
import {ApiProvider} from "../../../../../api/BaseResponse";
import {useTypeSelector} from "../../../../utils/Hooks/UseTypeSelector";



export const LevelPage = () => {
    const navigate = useNavigate();
    const SBApi = useContext(ApiProvider);
    const routeParams = useParams();
    const [loading, setLoading] = useState(false);
    const [levelInfo, setLevelInfo] = useState<CourseLevelInfo | null>(null);
    const token = useTypeSelector(store => store.authUser.token);

    const userLoading = useTypeSelector(store => store.authUser.loading);

    console.log("routeParams", routeParams);

    // const goToLevel = async () => {
    //     navigate('/course/' + courseId + "/level/" + id);
    // } //TODO - тут остановился

    const color = useMemo(() => getBGColors(1), []);

    useEffect(() => {
        if (!userLoading) {
            void fetchLevelInfo();
        }
        window.onmessage = function (e) {
            console.log(e)
            if (e.data && e.data.language) {
                console.log(e.data)
                // handle the e.data which contains the code object
            }
        }
        const itr = setInterval(() => window?.document?.querySelector(".top-section-group-results")?.remove(), 1000);
        return () => clearTimeout(itr);
    }, [userLoading]);

    useEffect(() => {



    });

    const fetchLevelInfo = async () => {
        setLoading(true);
        const data = await SBApi.withAuthorization(token as string).get<CourseLevelInfo>(`course/${routeParams?.courseId as string}/level/${routeParams?.levelId as string}`);
        if (data.isOk) {
            setLevelInfo(data.data)
        }
        setLoading(false);
    }

    return (
        <>
            <br/>
            <br/>
            <Editor height="450px" defaultLanguage="csharp" defaultValue={startUserCode}/>
            <iframe
                frameBorder="0"
                height="450px"
                src="https://sharplab.io/#v2:CYLg1APgAgTAjAWAFBQMwAJboMLoN7LpGYZQAs6AsgBQCU+hxTUcAnNQEQe0DcjTA9P3QBfZCKA="
                width="100%">
            </iframe>

        </>
    );
};