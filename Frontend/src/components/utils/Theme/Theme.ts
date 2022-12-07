import {createTheme} from "@mui/material";
import {blue, pink, purple} from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        secondary: {
            // This is green.A700 as hex.
            main: '#ffffff',
            "500": pink[500],
            "100": purple[500],
        },
        background: {
            paper: "#ffffff",
            default: "#ffffff"
        }
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#242F6A"
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#ffffff',
        },
        background: {
            paper: "#202020",
            default: "#202020",
        }
    },
});
