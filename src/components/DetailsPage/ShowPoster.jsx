import React from "react";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

const ShowPoster = ({ showImg }) => {
  const smallScreen = useMediaQuery("(max-width:425px)");
  return (
    <Box
      component="img"
      width={"100%"}
      minWidth={250}
      maxWidth={smallScreen ? 425 : 250}
      maxHeight={600}
      src={showImg}
    />
  );
};

export default ShowPoster;
