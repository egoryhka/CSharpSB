import {useTypeSelector} from "./UseTypeSelector";
import {Navigate} from "react-router-dom";
import React from "react";

interface UnauthorizedPageProps {
    children: React.ReactElement;
}


export const UnauthorizedPage = (props: UnauthorizedPageProps) => {
    const user = useTypeSelector(state => state.authUser);
    if (!user.login && !user.loading) {
        return <Navigate to={'/uregisterrequest'}/>
    }
    return <>{props.children}</>
}