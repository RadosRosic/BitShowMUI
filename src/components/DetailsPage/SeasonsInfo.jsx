import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MenuItem, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const SeasonsInfo = () => {
  const id = useParams().id;
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
      .then((res) => res.json())
      .then((data) => setSeasons(data));
  }, [id]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");

  const seasonIndex = selectedSeason - 1; // get index based on selected season
  const currentSeason = seasons[seasonIndex];

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const changeSeason = (event) => {
    setSelectedSeason(event.target.value);
  };

  useEffect(() => {
    if (seasons[0]?.number) {
      setSelectedSeason(1);
    }
  }, [seasons]); // this serves purpose to get rid of MUI warning: 'You have provided out-of-range value';

  return (
    <>
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          label="Season"
          select
          value={selectedSeason}
          onChange={changeSeason}
          sx={{ width: 75 }}
        >
          {seasons?.map((season) => (
            <MenuItem key={season?.id} value={season?.number}>
              {season?.number}
            </MenuItem>
          ))}
        </TextField>
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body2">
            Episodes: {currentSeason?.episodeOrder}
          </Typography>
          <Typography variant="body2">
            {formatDate(currentSeason?.premiereDate)} -{" "}
            {formatDate(currentSeason?.endDate)}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        variant="body1"
        component="p"
        dangerouslySetInnerHTML={{
          __html: currentSeason?.summary
            ? currentSeason?.summary
            : "<p>No info</p>",
        }}
      />
    </>
  );
};

export default SeasonsInfo;
