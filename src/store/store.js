import { configureStore } from "@reduxjs/toolkit";
import allShowsReducer from "./allShowsSlice";
import themeReducer from "./themeSlice";

export default configureStore({
  reducer: {
    allShows: allShowsReducer,
    theme: themeReducer,
  },
});
