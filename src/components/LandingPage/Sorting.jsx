import React from "react";
import { TextField, MenuItem } from "@mui/material";

const Sorting = ({ startingValue, setSortBy }) => {
  const handleSorting = (event) => {
    setSortBy(event.target.value);
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
