import React from "react";
import {MainCode} from "./Pages/MainCode";
import {UserCode} from "./Pages/UserCode";

export interface WikiModel {
    title: string;
    id: string;
    content: React.ReactNode;
}

export const wiki: WikiModel[] = [{
    id: "maincode",
    title: "Как описать прогоняемый код во время создания уровня",
    content: <MainCode/>
},
    {id: "usercode", title: "Как описать стартовый пользовательский код", content: <UserCode/>}]