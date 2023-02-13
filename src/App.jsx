import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { setGenres, setShows } from "./store/allShowsSlice";

import MainHeader from "./components/MainHeader";
import LandingPage from "./components/LandingPage/LandingPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Filters from "./components/LandingPage/Filters";

const getGenres = (shows) => {
  return [...new Set(shows.map((show) => show.genres).flat())].sort();
};

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setShows(data));
        dispatch(setGenres(getGenres(data)));
      });
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MainHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/page-1" />} />
          <Route path="/:page" element={<LandingPage />} />
          <Route path="/show/:id" element={<DetailsPage />} />
        </Routes>
        <Filters />
      </ThemeProvider>
    </>
  );
};

export default App;
