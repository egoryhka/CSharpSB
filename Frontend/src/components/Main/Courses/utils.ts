import {green, grey, pink, purple} from "@mui/material/colors";

export const month = 1000 * 60 * 60 * 24 * 30;
export const day = 1000 * 60 * 60 * 24;
export const dateAfterMonthConst = new Date(Date.now() + month);
export const backgroundColors = ['rgba(255, 0, 0, .5)', 'rgba(0, 255, 0, .5)', 'rgba(255, 255, 0, .5)', 'rgba(255,123,0,0.5)', 'rgba(0,255,255,0.5)', 'rgba(0,0,255,0.5)', 'rgba(255,0,255,0.5)', 'rgba(119,207,67,0.5105392498796393)', 'rgba(176,81,186,0.5105392498796393)', 'rgba(190,56,119,0.5105392498796393)'];
export const getBGColors = (count: number) => {
    const colors = [...backgroundColors.sort(() => 0.5 - Math.random())];
    colors.length = count;
    return colors;
}

export const getBGColorByStatus = (status: LevelStatus): { defaultColor: string, hover: string } => {
    switch (status) {
        case LevelStatus.Current:
            return {hover: purple[400], defaultColor: purple[100]};
        case LevelStatus.Completed:
            return {hover: green[400], defaultColor: green[100]};
        case LevelStatus.Admin:
            return {hover: grey[400], defaultColor: grey[100]};
        case LevelStatus.Closed:
            return {hover: grey[400], defaultColor: grey[100]};
        default:
            return {hover: 'rgba(128, 128, 128, .5)', defaultColor: 'rgba(220, 220, 220, .5)'};

    }
}

export enum Roles {
    Guest,
    Participant,
    Admin,
    Owner,
}

export enum LevelStatus {
    Admin,
    Current,
    Closed,
    Completed,
}

export interface CourseLevelInfo {
    id: number;
    name: string
    description: string
    order: number;
    levelStatus: LevelStatus;
    mainCode: string;
    userCode: string;
    helpText: string;
    helpUsed: boolean;
    start: boolean;
    end: boolean;
    code: string;
    next?: CourseLevelInfo;
    prev?: CourseLevelInfo;
    expResultsJson?: string;
}

export interface CodeCheckResult {
    errors: string[];
    outputs: CodeCheckOutputResult[];
    status: CheckCodeStatusTypes;
}

export interface CodeCheckOutputResult {
    isCorrect: boolean;
    expected: string;
    real: string;
}

export enum CheckCodeStatusTypes {
    Error,
    Failure,
    Success,
}

export interface CourseInfo {
    admins: any[]
    description: string;
    name: string;
    language: string;
    role: Roles;
    owner: UserInfo;
    id: string;
    participantsCount: number;
}

export interface UserInfo {
    id: string;
    name: string;
    surname: string;
    email: string;
    login: string;
}

export function extractUserName(user?: UserInfo): string {
    if (user?.name && user?.surname) {
        return user?.name + " " + user?.surname;
    }
    if (user?.email) {
        return user?.email;
    }
    return user?.login ?? "User";
}

export function getRoleDescription(role?: Roles) {
    switch (role) {
        case undefined:
            return null;
        case Roles.Admin:
            return "Администратор";
        case Roles.Owner:
            return "Владелец";
        case Roles.Guest:
            return "Гость";
        case Roles.Participant:
            return "Участник";
        default:
            throw new Error("Unknown role type");
    }
}

export const getLinkText = (role?: Roles): string => {
    switch (role) {
        case undefined:
            return "";
        case Roles.Admin:
            return "Редактировть описание";
        case Roles.Owner:
            return "Редактировть описание";
        case Roles.Guest:
            return "Присоедениться";
        case Roles.Participant:
            return "Покинуть";
        default:
            throw new Error("Unknown role type");
    }
}

export const getLinkLevelText = (role?: Roles): string | undefined => {
    switch (role) {
        case undefined:
            return "";
        case Roles.Admin:
            return "Добавить уровень";
        case Roles.Owner:
            return "Добавить уровень";
        case Roles.Guest:
            return undefined;
        case Roles.Participant:
            return undefined;
        default:
            throw new Error("Unknown role type");
    }
}

export const startUserCode = `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace HelloWorld
{
\tpublic class Program
\t{
\t\tpublic static void Main(string[] args)
\t\t{
\t\t\t//-------------------;
\t\t\t//Пишите код вот сюда;
\t\t\t//-------------------;
\t\t}
\t}
}`

export const startMainCode = `Console.WriteLine(GetGreetingsMessage("Hello, World!"));`

export const userCode = `public static string GetGreetingsMessage(string text)
{
//-------------------;
//Пишите код вот сюда;
//-------------------;
}`