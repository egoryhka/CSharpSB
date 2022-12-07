import React, {useEffect, useState} from 'react';

import {ConfData, getConferencePage} from "../../../../api/ConferenceActions/getConferencePage";
import {ConferencePageView} from "./ConferencePageView";
import {Loader} from "../../../utils/Loader/Loader";
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {useNavigate, useParams} from "react-router-dom";

const ConferencePage = () => {
    const [loading, setLoading] = useState<boolean>();
    const [confData, setConfData] = useState<ConfData>();
    const {token} = useTypeSelector(state => state.authUser);
    const routeParams = useParams();
    const navigate = useNavigate();

    const getConfInfo = async () => {
        if (routeParams.confId) {
            setLoading(true);
            const responce = await getConferencePage(routeParams.confId, token);
            if (responce.isOk) {
                setConfData(responce);
                setLoading(false);
            }
        } else {
            navigate("/notfound");
        }
    }

    useEffect(() => {
        getConfInfo();
    }, []);

    return loading
        ? <Loader text={"Подгружаем конференцию"}/>
        : <ConferencePageView conf={confData}/>
};

export default ConferencePage;
