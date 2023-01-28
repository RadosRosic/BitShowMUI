import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const MainHeader = ({ changeThemeDark, changeThemeLight, darkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          m: "auto",
          p: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          <Link to="/">BIT Show</Link>
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          component="nav"
          alignItems={"center"}
        >
          <Typography variant="h6">
            <Link to="/faq">FAQ</Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/about">About</Link>
          </Typography>
          <IconButton onClick={darkMode ? changeThemeLight : changeThemeDark}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
