import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setGenres, setShows } from "./store/allShowsSlice";

import LandingPage from "./components/LandingPage/LandingPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Root from "./Root";

const getGenres = (shows) => {
  return [...new Set(shows.map((show) => show.genres).flat())].sort();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/:page", element: <LandingPage /> },
      { path: "show/:id", element: <DetailsPage /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setShows(data));
        dispatch(setGenres(getGenres(data)));
      });
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
