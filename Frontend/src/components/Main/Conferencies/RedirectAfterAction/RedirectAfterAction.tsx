import React, {useEffect} from 'react';
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {leaveConference} from "../../../../api/ConferenceActions/LeaveConference";
import {Loader} from "../../../utils/Loader/Loader";
import {joinConference} from "../../../../api/ConferenceActions/JoinConference";
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";

export const RedirectAfterAction = () => {
    const email = useTypeSelector(store => store.authUser.email);
    const navigate = useNavigate();
    const location = useLocation();
    const routeParams = useParams();
    const confId = routeParams.confId;
    const action = location.pathname.split("/")[2];

    useEffect(() => {
        const redirect = async () => {
            if (!confId) {
                throw new Error("Conference has not uuid")
            } else if (!email) {
                navigate("/signin", {state: {action: action, to: confId}});
            } else if (action === "leave") {
                await leaveConference(confId);
                navigate("/conferencepage/" + confId);
            } else if (action === "join") {
                await joinConference(confId);
                navigate("/conferencepage/" + confId);
            }
        }
        void redirect();
    }, [])

    return <Loader text={"Осуществляем действие"}/>;
};
