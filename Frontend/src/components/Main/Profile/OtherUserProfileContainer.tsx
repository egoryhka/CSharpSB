import React, {useEffect} from 'react';

import {OtherUserProfileView} from "./OtherUserProfileView";
import {useActions} from "../../utils/Hooks/UseActions";
import {clearUserProfile} from "../../../redux/action-creators/userActionCreators/getUser";
import {useParams} from "react-router-dom";

export const OtherUserProfileContainer = () => {
    const {getUserProfile} = useActions();
    const routeParams = useParams();

    useEffect(() => {
        if (routeParams.userId){
            getUserProfile(routeParams.userId);
        }
        return () => {
            clearUserProfile();
        };
    }, [routeParams.userId]);

    return <OtherUserProfileView/>
}
