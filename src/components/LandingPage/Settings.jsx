import React from "react";
import { openDrawer } from "../../store/allShowsSlice";
import { useDispatch } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import { Button, Stack } from "@mui/material";
import Sorting from "./Sorting";
import Search from "./Search";

const Settings = ({
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  searchShows,
}) => {
  const dispatch = useDispatch();

  const openDrawerHandler = () => {
    dispatch(openDrawer());
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      p={2}
      spacing={3}
      m="auto"
      width={{ xs: "80%", sm: "50%", md: "80%" }}
    >
      <Button endIcon={<TuneIcon />} size="large" onClick={openDrawerHandler}>
        Filters
      </Button>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchShows={searchShows}
      />
      <Sorting startingValue={sortBy} setSortBy={setSortBy} />
    </Stack>
  );
};

export default Settings;
