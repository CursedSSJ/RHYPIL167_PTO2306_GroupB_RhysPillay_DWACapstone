import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#46000D",
    dark: "#5E0009",
    light: "#720137",
  },
  secondary: {
    main: "#590054",
    light: "#42002E",
  },
  text: {
    primary: "#ffffff",
    secondary: "#cccccc",
  },
  custom: {
    black: "#000000",
    white: "#FFFFFF",
  },
};

export default createTheme(colors);
