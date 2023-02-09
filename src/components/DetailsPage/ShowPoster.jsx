import React from "react";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

const ShowPoster = ({ showImg }) => {
  const smallScreenImageCenter = { display: "inline-block", m: "auto" };
  const smallScreen = useMediaQuery("(max-width:425px)");

  return (
    <Box
      component="img"
      width={"100%"}
      minWidth={smallScreen ? 320 : 290}
      maxWidth={smallScreen ? 425 : 290}
      maxHeight={600}
      src={showImg}
    />
  );
};

export default ShowPoster;
