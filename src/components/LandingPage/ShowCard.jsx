import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  ButtonGroup,
  IconButton,
} from "@mui/material/";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { flexSBC } from "../../style";
import { Link } from "react-router-dom";

const ShowCard = ({ show, displaySnackbar }) => {
  const [favShow, setFavShow] = useState(
    localStorage.getItem(`fav show ${show.id}`)
  );
  const [watchLater, setWatchLater] = useState(
    localStorage.getItem(`watch list ${show.id}`)
  );

  const addFavourite = (id) => {
    localStorage.setItem(`fav show ${id}`, `${show.name}`);
    setFavShow(true);
  };

  const removeFavourite = (id) => {
    localStorage.removeItem(`fav show ${id}`);
    setFavShow(false);
  };

  const addToWatchList = (id) => {
    localStorage.setItem(`watch list ${id}`, `${id}`);
    setWatchLater(true);
  };

  const removeFromWatchList = (id) => {
    localStorage.removeItem(`watch list ${id}`);
    setWatchLater(false);
  };
  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia component="img" src={show.image.medium} />
        </CardActionArea>
        <CardContent sx={flexSBC}>
          <Typography variant="subtitle1" component="h2">
            {show.name}
          </Typography>
          <Avatar>{show.rating.average}</Avatar>
        </CardContent>
        <CardActions sx={flexSBC}>
          <Link to={`/show/${show.id}`}>
            <Button size="medium" color="primary">
              More info
            </Button>
          </Link>

          <ButtonGroup>
            {!favShow && (
              <IconButton
                aria-label="Add to Favorites"
                onClick={() => {
                  addFavourite(show.id);
                  displaySnackbar(`Added ${show.name} to favorites`);
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            )}
            {favShow && (
              <IconButton
                aria-label="Remove from Favorites"
                onClick={() => {
                  removeFavourite(show.id);
                  displaySnackbar(`Removed ${show.name} from favorites`);
                }}
              >
                <FavoriteIcon color="error" />
              </IconButton>
            )}
            {!watchLater && (
              <IconButton
                aria-label="Add to Watch List"
                onClick={() => {
                  addToWatchList(show.id);
                  displaySnackbar(`Added ${show.name} to watch list`);
                }}
              >
                <WatchLaterIcon />
              </IconButton>
            )}
            {watchLater && (
              <IconButton
                aria-label="Remove from Watch List"
                onClick={() => {
                  removeFromWatchList(show.id);
                  displaySnackbar(`Removed ${show.name} from watch list`);
                }}
              >
                <PlaylistRemoveIcon />
              </IconButton>
            )}
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
};

export default ShowCard;
