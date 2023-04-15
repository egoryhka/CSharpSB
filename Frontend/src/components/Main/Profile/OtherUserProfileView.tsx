import React from 'react';
import {Grid} from "@mui/material";
import {Loader} from "../../utils/Loader/Loader";
import {useTypeSelector} from "../../utils/Hooks/UseTypeSelector";
import {Navigate} from "react-router-dom";
import {ManualInfo} from "./ManualInfo";
import {ProfileTitle} from "./ProfileTitle";
import {CoursesContainer} from "../Conferencies/ConferenceView/CoursesContainer";

export const OtherUserProfileView = () => {
    const userData = useTypeSelector(store => store.fetchUser);
    const myEmail = useTypeSelector(store => store.authUser.email);

    if (userData.email && myEmail && userData.email === myEmail) {
        return <Navigate  to={'/myprofile'}/>
    }

    if (userData.isFounded === false) {
        return <Navigate  to={'/notfound'}/>
    }

    const getUserName = () => {
        if (userData.surname && userData.name) {
            return `${userData.surname} ${userData.name}`;
        }
        return userData.email || "";
    };

    return (
        <>
            {!userData.loading ? <Grid container spacing={1}>
                <ProfileTitle editModeExist={false} name={getUserName()}/>
                <ManualInfo user={userData}/>
                {userData.email ? <CoursesContainer userId={userData.email}/> : undefined}
            </Grid> : <Loader text={"Ищем сраничку пользователя"}/>}
        </>
    );
};
