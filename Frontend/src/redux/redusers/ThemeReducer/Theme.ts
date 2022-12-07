import {themeChangeActions, themesAction, themeState} from "../../types/theme/theme";
import {createTheme} from "@mui/material";
import {purple} from "@mui/material/colors";
import {darkTheme, lightTheme} from "../../../components/utils/Theme/Theme";

const initialState: themeState = {
    currentTheme: lightTheme,
};

export const ThemeReduser = (state = initialState, action: themesAction) : themeState => {
    switch (action.type) {
        case themeChangeActions.CHANGE_THEME:
            if (action.payload === "light") {
                return {currentTheme: lightTheme};
            } else if (action.payload === "dark"){
                return {currentTheme: darkTheme};
            } else {
                return {currentTheme: lightTheme};
            }
        default:
            return state;
    }
};
