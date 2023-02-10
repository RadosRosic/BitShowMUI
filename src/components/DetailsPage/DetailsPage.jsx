import React from "react";
import { useParams } from "react-router-dom";
import { Stack, Paper, Box, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";

import ShowAccordion from "./ShowAccordion";
import ShowPoster from "./ShowPoster";
import CastList from "./CastList";
import SeasonsInfo from "./SeasonsInfo";
import ShowImages from "./ShowImages";
import ShowInfo from "./ShowInfo";

const DetailsPage = () => {
  const id = useParams().id;
  const allShows = useSelector((state) => state.allShows.allShows);
  const smallScreen = useMediaQuery("(max-width:599px)");
  const mediumScreen = useMediaQuery("(min-width:600px)");
  const largeScreen = useMediaQuery("(min-width:1440px)");
  const show = allShows.find((show) => +show.id === +id);

  return (
    <>
      {largeScreen && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={8}>
            <ShowInfo show={show} />
          </Grid>
          <Grid item xs={4}>
            <ShowImages />
          </Grid>
          <Grid item sx={{ overflow: "hidden" }}>
            <Paper sx={{ p: 1 }} elevation={5}>
              <CastList />
            </Paper>
          </Grid>
        </Grid>
      )}
      {mediumScreen && !largeScreen && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            <ShowInfo show={show} />
          </Grid>
          <Grid item xs={12} sx={{ overflow: "hidden" }}>
            <Paper sx={{ p: 1 }} elevation={5}>
              <CastList />
            </Paper>
          </Grid>
          <Grid item md={12}>
            <Paper sx={{ p: 1 }} elevation={5}>
              <SeasonsInfo />
            </Paper>
          </Grid>
          <Grid item md={12} sx={{ m: "auto" }}>
            <ShowImages />
          </Grid>
        </Grid>
      )}
      {smallScreen && (
        <Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ShowPoster showImg={show?.image?.original} />
          </Box>
          <ShowAccordion show={show} />
        </Stack>
      )}
    </>
  );
};

export default DetailsPage;
