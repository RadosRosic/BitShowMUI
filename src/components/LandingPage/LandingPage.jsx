import React, { useState, useReducer, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ShowCard from "./ShowCard";
import { Stack, Grid, Pagination, Snackbar } from "@mui/material";
import Settings from "./Settings";

const paginationReducer = (_, action) => {
  return {
    page: action.page,
    from: action.page * 24 - 24,
    to: action.page * 24,
  };
};

const LandingPage = ({ allShows, openDrawer, selectedGenres, minRating }) => {
  const navigate = useNavigate();
  const currentPage = +useParams().page.slice(-1);

  const [sortBy, setSortBy] = useState("rating hi-low");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [paginationState, dispatchPagination] = useReducer(paginationReducer, {
    page: 1,
    from: 0,
    to: 24,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

  const handleOpen = (message) => {
    setOpenSnackbar(true);
    setSnackbarContent(message);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
    setSnackbarContent("");
  };

  const handlePageChange = useCallback(
    (_, newPage) => {
      dispatchPagination({ page: newPage });
      navigate(`/page-${newPage}`);
    },
    [navigate]
  );

  useEffect(() => {
    handlePageChange(null, currentPage);
  }, [currentPage, handlePageChange]);

  let filteredShows;
  let totalPages;

  if (selectedGenres.length) {
    filteredShows = allShows.filter((show) =>
      show.genres.some((genre) =>
        selectedGenres.some((selectedGenre) => selectedGenre === genre)
      )
    );
    totalPages = Math.ceil(filteredShows.length / 24);
  } else {
    filteredShows = allShows.slice();
    totalPages = Math.ceil(filteredShows.length / 24);
  }

  if (minRating > 1) {
    filteredShows = filteredShows.filter(
      (show) => show.rating.average >= minRating
    );
    totalPages = Math.ceil(filteredShows.length / 24);
  } else {
    filteredShows = filteredShows.slice();
  }

  const displayShows = searchQuery
    ? searchResults
    : filteredShows.slice(paginationState.from, paginationState.to);

  switch (sortBy) {
    case "name a-z":
      allShows.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name z-a":
      allShows.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "rating low-hi":
      allShows.sort((a, b) => a.rating.average - b.rating.average);
      break;
    case "rating hi-low":
    default:
      allShows.sort((a, b) => b.rating.average - a.rating.average);
  }

  const searchShows = (query) => {
    if (query) {
      const searchedShows = filteredShows.filter((show) =>
        show.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(searchedShows);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Stack alignItems="center">
      <Settings
        sortBy={sortBy}
        setSortBy={setSortBy}
        openDrawer={openDrawer}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchShows={searchShows}
      />
      <Grid container spacing={3} p={4} component="main">
        {displayShows.map((show) => (
          <Grid item key={show.id} xl={2} lg={3} md={4} sm={6} xs={12}>
            <ShowCard show={show} displaySnackbar={handleOpen} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ p: 1 }}
        variant="outlined"
        shape="rounded"
        size="large"
        page={paginationState.page}
        count={totalPages}
        onChange={handlePageChange}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleClose}
        message={snackbarContent}
      />
    </Stack>
  );
};

export default LandingPage;
