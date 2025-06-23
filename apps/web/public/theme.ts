"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#A75D2A", // earthy brown
      contrastText: "#fff",
    },
    secondary: {
      main: "#E4B343", // golden saffron
      contrastText: "#1e1e1e",
    },
    background: {
      default: "#FAF6F0", // ivory/beige
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3E2C1C", // rich brown
      secondary: "#6F4E37", // lighter brown
    },
    error: {
      main: "#A30000", // crimson/maroon
    },
    warning: {
      main: "#E5A100", // amber
    },
    info: {
      main: "#6BA292", // muted jade green
    },
    success: {
      main: "#A3B18A", // soft olive green
    },
  },
  typography: {
    fontFamily: '"Outline Variable", Arial, sans-serif',
  },
});

export default theme;
