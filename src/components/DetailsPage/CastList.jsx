import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ActorCard from "./ActorCard";

const CastList = () => {
  const id = useParams().id;
  const smallScreen = useMediaQuery("(max-width:599px)");
  const mediumScreen = useMediaQuery("(min-width:600px)");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((data) => setCast(data));
  }, [id]);

  return (
    <>
      {smallScreen && (
        <List>
          {cast.map((actor) => (
            <React.Fragment key={actor?.person.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={actor?.person?.image?.medium}
                    alt={actor?.person?.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={actor?.person?.name}
                  secondary={`as ${actor?.character?.name}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      {mediumScreen && (
        <ImageList
          sx={{
            py: 1,
            gridAutoFlow: "column",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(195px,1fr)) !important",
            gridAutoColumns: "minmax(195px, 1fr)",
          }}
        >
          {cast.map((actor) => (
            <ImageListItem key={actor?.character?.id}>
              <ActorCard actor={actor} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </>
  );
};

export default CastList;
