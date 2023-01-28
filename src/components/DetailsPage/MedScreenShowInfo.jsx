import React, { useState } from "react";
import { Paper, ToggleButtonGroup, ToggleButton } from "@mui/material";
import SeasonsInfo from "./SeasonsInfo";
import ShowImages from "./ShowImages";
import CastList from "./CastList";

const MedScreenShowInfo = ({ selectedSeason, seasons, setSelectedSeason }) => {
  const [activeSection, setActiveSection] = useState("seasons");

  const changeSection = (_, section) => {
    if (section !== null) {
      setActiveSection(section);
    }
  };

  return (
    <Paper square elevation={5} sx={{ m: 1.5, p: 2 }}>
      <ToggleButtonGroup
        exclusive
        size="small"
        sx={{ my: 2 }}
        value={activeSection}
        onChange={changeSection}
        aria-label="show sections"
      >
        <ToggleButton value="seasons" aria-label="seasons">
          Seasons
        </ToggleButton>
        <ToggleButton value="cast" aria-label="cast">
          Cast
        </ToggleButton>
        <ToggleButton value="galery" aria-label="galery">
          Galery
        </ToggleButton>
      </ToggleButtonGroup>
      {activeSection === "seasons" && (
        <SeasonsInfo
          seasons={seasons}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
      )}
      {activeSection === "cast" && <CastList />}
      {activeSection === "galery" && <ShowImages />}
    </Paper>
  );
};

export default MedScreenShowInfo;
