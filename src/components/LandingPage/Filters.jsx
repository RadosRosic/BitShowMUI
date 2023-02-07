import React from "react";
import { useSearchParams } from "react-router-dom";
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

const Filters = ({
  isDrawerOpen,
  setIsDrawerOpen,
  genres,
  selectedGenres,
  setSelectedGenres,
  minRating,
  setMinRating,
}) => {
  const handleCheckboxChange = (event) => {
    event.target.checked
      ? setSelectedGenres((previousState) => [
          ...previousState,
          event.target.value,
        ])
      : setSelectedGenres((previousState) =>
          previousState.filter((genre) => genre !== event.target.value)
        );
  };

  const handleSliderChange = (newRating) => {
    setMinRating(newRating);
  };

  const resetFilters = () => {
    setMinRating(1);
    setSelectedGenres([]);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <FormControl sx={{ width: "320px", p: 3 }}>
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
      <FormControl sx={{ p: 3 }}>
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
        sx={{ width: "60%", mx: "auto", my: 2 }}
      >
        Reset Filters
      </Button>
      <IconButton
        aria-label="Close Drawer"
        onClick={closeDrawer}
        sx={{ width: "10%", mx: "auto", my: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Drawer>
  );
};

export default Filters;
