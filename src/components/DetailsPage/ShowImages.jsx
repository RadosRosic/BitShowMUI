import { ImageList, ImageListItem, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowImages = () => {
  const id = useParams().id;
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/images`)
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, [id]);
  return (
    <Paper square elevation={5} sx={{ m: 1.5, p: 1 }}>
      <ImageList>
        {images?.map((image) => (
          <ImageListItem key={image.id}>
            <img
              src={image?.resolutions?.original?.url}
              alt=""
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
};

export default ShowImages;
