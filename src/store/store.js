import { configureStore } from "@reduxjs/toolkit";
import allShowsReducer from "./allShowsSlice";

export default configureStore({
  reducer: {
    allShows: allShowsReducer,
  },
});
