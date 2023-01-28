import React from "react";
import { useParams } from "react-router-dom";
import { Stack, Paper, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import ShowHeader from "./ShowHeader";
import ShowAccordion from "./ShowAccordion";
import ShowPoster from "./ShowPoster";
import MedScreenShowInfo from "./MedScreenShowInfo";
import CastList from "./CastList";
import SeasonsInfo from "./SeasonsInfo";
import ShowImages from "./ShowImages";

const DetailsPage = ({ allShows }) => {
  const id = useParams().id;
  const smallScreen = useMediaQuery("(max-width:599px)");
  const mediumScreen = useMediaQuery("(min-width:600px)");
  const largeScreen = useMediaQuery("(min-width:1440px)");
  const show = allShows.find((show) => +show.id === +id);

  return (
    <>
      <Stack direction={largeScreen ? "row" : "column"}>
        <Paper
          square
          elevation={5}
          sx={{ m: 1.5, p: 1.5, width: largeScreen ? "65%" : "inherit" }}
        >
          <Stack>
            <ShowHeader show={show} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <ShowPoster showImg={show?.image?.original} />
            {mediumScreen && (
              <Typography dangerouslySetInnerHTML={{ __html: show?.summary }} />
            )}
          </Stack>
          {smallScreen && <ShowAccordion show={show} />}
        </Paper>
        {mediumScreen && !largeScreen && <MedScreenShowInfo />}
        {largeScreen && (
          <Paper square elevation={5} sx={{ m: 1.5, p: 1.5, width: "35%" }}>
            <SeasonsInfo />
          </Paper>
        )}
      </Stack>
      {largeScreen && (
        <Paper square elevation={5} sx={{ m: 1.5, p: 1 }}>
          <CastList />
        </Paper>
      )}
      {largeScreen && (
        <Paper square elevation={5} sx={{ m: 1.5, p: 1 }}>
          <ShowImages />
        </Paper>
      )}
    </>
  );
};

export default DetailsPage;
