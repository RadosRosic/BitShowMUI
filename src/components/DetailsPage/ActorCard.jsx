import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ActorCard = ({ actor }) => {
  const [actorSide, setActorSide] = useState(true);
  const flipCard = () => {
    setActorSide((oldSide) => !oldSide);
  };
  return (
    <Card sx={{ mx: 0.5 }}>
      <CardActionArea onClick={flipCard}>
        {actorSide && (
          <CardMedia
            component="img"
            src={actor?.person?.image?.medium}
            alt={actor?.person?.name}
          />
        )}
        {!actorSide && (
          <CardMedia
            component="img"
            src={actor?.character?.image?.medium}
            alt={actor?.character?.name}
          />
        )}
      </CardActionArea>
      <CardContent>
        {actorSide && (
          <Typography noWrap variant="subtitle2">
            {actor?.person?.name}
          </Typography>
        )}
        {!actorSide && (
          <Typography noWrap variant="subtitle2">
            {actor?.character?.name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ActorCard;
