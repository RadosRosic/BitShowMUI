import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: localStorage.getItem("dark mode"),
  },
  reducers: {
    darkModeOn: (state) => {
      state.darkMode = true;
      localStorage.setItem("dark mode", "on");
    },
    darkModeOff: (state) => {
      state.darkMode = false;
      localStorage.removeItem("dark mode");
    },
  },
});

export const { darkModeOn, darkModeOff } = themeSlice.actions;

export default themeSlice.reducer;
