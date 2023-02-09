import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton, Paper, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ShowImages = () => {
  const id = useParams().id;
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const imagePrevious = () => {
    if (imageIndex > 0) {
      setImageIndex((previousImageIndex) => previousImageIndex - 1);
    } else {
      setImageIndex(images.length - 1);
    }
  };
  const imageNext = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex((previousImageIndex) => previousImageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/images`)
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, [id]);
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "560px",
        p: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={imagePrevious}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box
          component="img"
          src={images[imageIndex]?.resolutions?.original?.url}
          width={"360px"}
        />
        <IconButton onClick={imageNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ShowImages;
