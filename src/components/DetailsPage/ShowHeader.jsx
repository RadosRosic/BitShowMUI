import React from "react";
import { Stack, Typography, Rating } from "@mui/material";
import Genres from "../LandingPage/Genres";
const ShowHeader = ({ show }) => {
  const directionSpecs = { sx: "column", sm: "row" };
  const alignmentSpecs = { sx: "flex-start", sm: "center" };

  return (
    <Stack spacing={2} component="header" p={1}>
      <Stack spacing={2} direction={directionSpecs} alignItems={alignmentSpecs}>
        <Typography variant="h4" component="h2">
          {show?.name}
        </Typography>
        <Genres genres={show?.genres} />
      </Stack>
      <Rating
        name="rating"
        precision={0.5}
        readOnly
        value={show?.rating?.average || 0}
        // this code prevents losing rating on refresh
        max={10}
      />
    </Stack>
  );
};

export default ShowHeader;
