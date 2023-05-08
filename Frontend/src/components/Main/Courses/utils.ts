export const month = 1000 * 60 * 60 * 24 * 30;
export const day = 1000 * 60 * 60 * 24;
export const dateAfterMonthConst = new Date(Date.now() + month);
export const backgroundColors = ['rgba(255, 0, 0, .5)', 'rgba(0, 255, 0, .5)', 'rgba(255, 255, 0, .5)', 'rgba(255,123,0,0.5)', 'rgba(0,255,255,0.5)', 'rgba(0,0,255,0.5)', 'rgba(255,0,255,0.5)', 'rgba(119,207,67,0.5105392498796393)', 'rgba(176,81,186,0.5105392498796393)', 'rgba(190,56,119,0.5105392498796393)'];
export const getBGColors = (count: number) => {
    const colors = [...backgroundColors.sort(() => 0.5 - Math.random())];
    colors.length = count;
    return colors;
}

export enum Roles {
    Guest,
    Participant,
    Admin,
    Owner,
}

export interface CourseLevelInfo {
    id: number;
    name: string
    description: string
    order: number;
    helpText: string;
}

export interface CourseInfo {
    admins: any[]
    description: string;
    name: string;
    lang: string;
    role: Roles;
    owner: any;
    participants: UserInfo[]
}

export interface UserInfo {
    id: string;
    name: string;
    surname: string;
    email: string;
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