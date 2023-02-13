import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Root = () => {
  const navigate = useNavigate();
  const params = useParams();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    if (!params.page) {
      navigate("page-1");
    }
  }, [navigate, params.page]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainHeader />
      <Outlet />
    </ThemeProvider>
  );
};

export default Root;
