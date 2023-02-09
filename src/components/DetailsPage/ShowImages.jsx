import { ImageList, ImageListItem } from "@mui/material";
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
    <>
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
    </>
  );
};

export default ShowImages;
