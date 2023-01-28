import { Avatar, Box } from "@mui/material";
import React from "react";

const genresBoxSpecs = { display: "flex", flexWrap: "wrap" };
const genresSpecs = { width: "fit-content", p: 1, m: 0.5 };

const Genres = ({ genres }) => {
  return (
    <Box sx={genresBoxSpecs}>
      {genres?.map((genre) => (
        <Avatar variant="square" sx={genresSpecs} key={genre}>
          {genre}
        </Avatar>
      ))}
    </Box>
  );
};

export default Genres;
