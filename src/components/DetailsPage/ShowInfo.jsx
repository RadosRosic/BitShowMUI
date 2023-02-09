import React, { useState } from "react";
import {
  ToggleButtonGroup,
  Paper,
  Stack,
  Typography,
  ToggleButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import ShowHeader from "./ShowHeader";
import ShowPoster from "./ShowPoster";
import SeasonsInfo from "./SeasonsInfo";

const ShowInfo = ({ show }) => {
  const largeScreen = useMediaQuery("(min-width:1440px)");
  const [infoSection, setInfoSection] = useState("synopsys");

  const selectInfoSection = (_, newSection) => {
    if (newSection !== null) {
      setInfoSection(newSection);
    }
  };

  return (
    <Paper sx={{ p: 1, height: "560px" }} elevation={5}>
      <ShowHeader show={show} />
      <Stack direction="row" spacing={2} p={1}>
        <ShowPoster showImg={show?.image?.original} />
        <Stack spacing={2}>
          {largeScreen && (
            <ToggleButtonGroup exclusive size="small" value={infoSection}>
              <ToggleButton onClick={selectInfoSection} value="synopsys">
                Synopsys
              </ToggleButton>
              <ToggleButton onClick={selectInfoSection} value="seasons">
                Seasons
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          {infoSection === "synopsys" && (
            <Typography dangerouslySetInnerHTML={{ __html: show?.summary }} />
          )}
          {infoSection === "seasons" && <SeasonsInfo />}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ShowInfo;
