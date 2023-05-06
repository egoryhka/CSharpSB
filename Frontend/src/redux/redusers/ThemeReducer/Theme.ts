import {themeChangeActions, themes, themesAction, themeState} from "../../types/theme/theme";
import {darkTheme, lightTheme} from "../../../components/utils/Theme/Theme";

const initialState: themeState = {
    currentTheme: darkTheme,
    themeType: themes.dark,
};

export const ThemeReducer = (state = initialState, action: themesAction) : themeState => {
    switch (action.type) {
        case themeChangeActions.CHANGE_THEME:
            if (action.payload === "light") {
                return {currentTheme: lightTheme, themeType: themes.light};
            } else if (action.payload === "dark"){
                return {currentTheme: darkTheme, themeType: themes.dark};
            }
            return {currentTheme: lightTheme, themeType: themes.light};
        default:
            return state;
    }
};
