import { createTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const launchertheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: { main: "#0052CC", light: "#4C8DFF", dark: "#003A99", contrastText: "#FFFFFF" },
    secondary: { main: "#6D28D9" },
    success: { main: "#22C55E" },
    warning: { main: "#F59E0B" },
    error: { main: "#EF4444" },
    info: { main: "#0284C7" },
    background: { default: "#F3F4F6", paper: "#FFFFFF" },
    text: { primary: "#0B1220", secondary: "#4B5563" }
  },
  typography: {
    fontFamily: '"Open Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans"',
    h1: { fontSize: 32, lineHeight: 1.25, fontWeight: 700 },
    h2: { fontSize: 28, lineHeight: 1.3, fontWeight: 700 },
    h3: { fontSize: 24, lineHeight: 1.35, fontWeight: 700 },
    body1: { fontSize: 16, lineHeight: 1.5 },
    body2: { fontSize: 14, lineHeight: 1.4 }
  },
  shape: { borderRadius: 12 },
  spacing: 8,
   components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: RouterLink,
      },
    },
    MuiLink: {
      defaultProps: {
        component: RouterLink,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
  },
});

export default launchertheme;
