import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Filters from "./components/LandingPage/Filters";
import MainHeader from "./components/MainHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Root = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MainHeader />
        <Filters />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default Root;
