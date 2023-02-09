import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import MainHeader from "./components/MainHeader";
import LandingPage from "./components/LandingPage/LandingPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Filters from "./components/LandingPage/Filters";

const App = () => {
  const [darkMode, setDarkMode] = useState(!!localStorage.getItem("dark mode"));
  const [allShows, setAllShows] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState(1);
  const genres = [
    ...new Set(allShows.map((show) => show.genres).flat()),
  ].sort();

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
      .then((data) => setAllShows(data));
  }, []);

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
              <LandingPage
                allShows={allShows}
                openDrawer={setIsDrawerOpen}
                selectedGenres={selectedGenres}
                minRating={minRating}
              />
            }
          />
          <Route
            path="/show/:id"
            element={<DetailsPage allShows={allShows} />}
          />
        </Routes>
        <Filters
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          genres={genres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          minRating={minRating}
          setMinRating={setMinRating}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
