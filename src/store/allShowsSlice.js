import { createSlice } from "@reduxjs/toolkit";

export const allShowsSlice = createSlice({
  name: "allShows",
  initialState: {
    allShows: [],
    allGenres: [],
    shows: [],
    isDrawerOpen: false,
    minRating: 1,
    selectedGenres: [],
    sortBy: "rating hi-low",
    page: 1,
  },
  reducers: {
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },

    setShows: (state, action) => {
      state.allShows = action.payload.sort(
        (a, b) => b.rating.average - a.rating.average
      );
      state.shows = action.payload;
    },
    setGenres: (state, action) => {
      state.allGenres = action.payload;
    },
    sortShows: (state, action) => {
      switch (action.payload) {
        case "rating hi-low":
          state.sortBy = "rating hi-low";
          state.shows.sort((a, b) => b.rating.average - a.rating.average);
          break;
        case "rating low-hi":
          state.sortBy = "rating low-hi";
          state.shows.sort((a, b) => a.rating.average - b.rating.average);
          break;
        case "name a-z":
          state.sortBy = "name a-z";
          state.shows.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name z-a":
          state.sortBy = "name z-a";
          state.shows.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          state.sortBy = "rating hi-low";
          state.shows.sort((a, b) => b.rating.average - a.rating.average);
      }
    },
    selectGenre: (state, action) => {
      state.selectedGenres.push(action.payload);
    },
    unselectGenre: (state, action) => {
      state.selectedGenres = state.selectedGenres.filter(
        (genre) => genre !== action.payload
      );
    },
    unselectAllGenres: (state) => {
      state.selectedGenres.length = 0;
    },
    filterByGenres: (state) => {
      state.shows = state.allShows.filter((show) =>
        show.genres.some((genre) => state.selectedGenres.includes(genre))
      );
    },
    unfilterByGenres: (state) => {
      state.shows = state.allShows;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
  },
});

export const {
  sortShows,
  setShows,
  setGenres,
  selectGenre,
  unselectGenre,
  filterByGenres,
  unfilterByGenres,
  setMinRating,
  unselectAllGenres,
  openDrawer,
  closeDrawer,
} = allShowsSlice.actions;

export default allShowsSlice.reducer;
