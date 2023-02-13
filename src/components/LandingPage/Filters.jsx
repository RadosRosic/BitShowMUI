import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGenre,
  unselectGenre,
  unselectAllGenres,
  setMinRating,
  closeDrawer,
} from "../../store/allShowsSlice";
import {
  Drawer,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Slider,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Filters = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.allShows.isDrawerOpen);
  const genres = useSelector((state) => state.allShows.allGenres);
  const minRating = useSelector((state) => state.allShows.minRating);
  const selectedGenres = useSelector((state) => state.allShows.selectedGenres);

  const handleCheckboxChange = (event) => {
    event.target.checked
      ? dispatch(selectGenre(event.target.value))
      : dispatch(unselectGenre(event.target.value));
  };

  const handleSliderChange = (newRating) => {
    dispatch(setMinRating(newRating));
  };

  const resetFilters = () => {
    dispatch(setMinRating(1));
    dispatch(unselectAllGenres());
  };

  const closeDrawerHandler = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawerHandler}>
      <FormControl sx={{ width: "320px", p: 2 }}>
        <FormLabel component="legend">Select Genres</FormLabel>
        <FormGroup sx={{ height: "500px" }}>
          {genres.map((genre) => (
            <FormControlLabel
              key={genre}
              value={genre}
              label={genre}
              control={
                <Checkbox
                  checked={selectedGenres.includes(genre)}
                  onChange={handleCheckboxChange}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl sx={{ p: 2 }}>
        <FormLabel component="legend">Minimum Rating</FormLabel>
        <Slider
          max={10}
          min={1}
          step={0.1}
          value={minRating}
          onChange={(_, newRating) => handleSliderChange(newRating)}
          valueLabelDisplay="auto"
        />
      </FormControl>
      <Button
        variant="outlined"
        onClick={resetFilters}
        sx={{ width: "60%", mx: "auto" }}
      >
        Reset Filters
      </Button>
      <IconButton
        aria-label="Close Drawer"
        onClick={closeDrawerHandler}
        sx={{ width: "10%", mx: "auto" }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Drawer>
  );
};

export default Filters;
