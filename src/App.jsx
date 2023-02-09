import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch } from "react-redux";
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

  const [darkMode, setDarkMode] = useState(!!localStorage.getItem("dark mode"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [minRating, setMinRating] = useState(1);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const changeThemeDark = () => {
    setDarkMode(true);
    localStorage.setItem("dark mode", "1");
  };

  const changeThemeLight = () => {
    setDarkMode(false);
    localStorage.removeItem("dark mode");
  };

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
        <MainHeader
          darkMode={darkMode}
          changeThemeDark={changeThemeDark}
          changeThemeLight={changeThemeLight}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/page-1" />} />
          <Route
            path="/:page"
            element={
              <LandingPage openDrawer={setIsDrawerOpen} minRating={minRating} />
            }
          />
          <Route path="/show/:id" element={<DetailsPage />} />
        </Routes>
        <Filters
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          minRating={minRating}
          setMinRating={setMinRating}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
