import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortShows } from "../../store/allShowsSlice";
import { TextField, MenuItem } from "@mui/material";

const Sorting = () => {
  const startingValue = useSelector((state) => state.allShows.sortBy);
  const dispatch = useDispatch();

  const handleSorting = (event) => {
    dispatch(sortShows(event.target.value));
  };

  return (
    <TextField
      label="Sort By"
      select
      value={startingValue}
      onChange={handleSorting}
      size="medium"
    >
      <MenuItem value="rating hi-low">Rating (high to low)</MenuItem>
      <MenuItem value="rating low-hi">Rating (low to high)</MenuItem>
      <MenuItem value="name a-z">Name (A to Z)</MenuItem>
      <MenuItem value="name z-a">Name (Z to A)</MenuItem>
    </TextField>
  );
};

export default Sorting;
