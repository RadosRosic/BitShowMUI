import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ searchQuery, setSearchQuery, searchShows }) => {
  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      value={searchQuery}
      onChange={(event) => {
        setSearchQuery(event.target.value);
        searchShows(event.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
