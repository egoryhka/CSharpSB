import {createTheme} from "@mui/material";
import {blue, pink, purple} from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: purple[600]
        },
        secondary: {
            main: '#ffffff',
            "500": pink[500],
            "100": purple[500],
        },
        background: {
            paper: "#ffffff",
            default: "#ffffff"
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: purple[800]
        },
        secondary: {
            main: '#ffffff',
            "500": pink[500],
            "100": purple[500],
        },
        background: {
            paper: "#202020",
            default: "#202020",
        },
        text: {
            primary: '#ffffff',
        },
    },
});
