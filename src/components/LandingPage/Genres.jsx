import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import { selectGenre } from "../../store/allShowsSlice";

const genresBoxSpecs = { display: "flex", flexWrap: "wrap" };
const genresSpecs = { width: "fit-content", p: 1, m: 0.5, cursor: "pointer" };

const Genres = ({ genres }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seeOtherShows = (genre) => {
    dispatch(selectGenre(genre));
    navigate("/");
  };

  return (
    <Box sx={genresBoxSpecs}>
      {genres?.map((genre) => (
        <Avatar
          variant="square"
          sx={genresSpecs}
          key={genre}
          onClick={() => seeOtherShows(genre)}
        >
          {genre}
        </Avatar>
      ))}
    </Box>
  );
};

export default Genres;
