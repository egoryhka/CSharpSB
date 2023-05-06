import {Theme} from "@mui/material";

export enum themeChangeActions {
    CHANGE_THEME = 'CHANGE_THEME',
}

export interface themeState {
    currentTheme: Theme;
    themeType: themes;
}

export enum themes {
    none = "",
    dark = "dark",
    light = "light",
}

export type themesAction = changeThemeAction

interface changeThemeAction {
    type: themeChangeActions.CHANGE_THEME;
    payload: keyof typeof themes;
}
