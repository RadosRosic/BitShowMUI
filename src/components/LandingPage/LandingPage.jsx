import React, { useState, useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByGenres,
  unfilterByGenres,
  sortShows,
} from "../../store/allShowsSlice";

import { Stack, Grid, Pagination, Snackbar } from "@mui/material";
import ShowCard from "./ShowCard";
import Settings from "./Settings";
import Filters from "./Filters";

const paginationReducer = (_, action) => {
  return {
    page: action.page,
    from: action.page * 24 - 24,
    to: action.page * 24,
  };
};

const LandingPage = ({ openDrawer }) => {
  const navigate = useNavigate();
  const currentPage = +useParams().page.split("-")[1];
  const dispatch = useDispatch();

  const shows = useSelector((state) => state.allShows.shows);
  const genres = useSelector((state) => state.allShows.selectedGenres);
  const sortBy = useSelector((state) => state.allShows.sortBy);
  const minRating = useSelector((state) => state.allShows.minRating);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [paginationState, dispatchPagination] = useReducer(paginationReducer, {
    page: 1,
    from: 0,
    to: 24,
  });

  const { from, to } = paginationState;

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

  const handlePageChange = (_, newPage) => {
    dispatchPagination({ page: newPage });
    navigate(`/page-${newPage}`);
  };

  useEffect(() => {
    handlePageChange(null, currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (genres.length) {
      dispatch(filterByGenres());
    }
    if (!genres.length) {
      dispatch(unfilterByGenres());
    }
    dispatch(sortShows(sortBy));
  }, [genres.length, sortBy, dispatch]);

  const searchShows = (query) => {
    if (query) {
      const searchedShows = shows.filter((show) =>
        show.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(searchedShows);
    }
  };

  const displayShows = searchQuery ? searchResults : shows;

  const totalPages = Math.ceil(displayShows.length / 24);

  const renderShowsJSX = (
    <Grid container spacing={3} p={4} component="main">
      {displayShows
        ?.filter((show) => show.rating.average >= minRating)
        ?.slice(from, to)
        .map((show) => (
          <Grid item key={show.id} xl={2} lg={3} md={4} sm={6} xs={12}>
            <ShowCard show={show} displaySnackbar={handleOpen} />
          </Grid>
        ))}
    </Grid>
  );

  return (
    <Stack alignItems="center">
      <Filters />
      <Settings
        openDrawer={openDrawer}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchShows={searchShows}
      />
      {renderShowsJSX}
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
