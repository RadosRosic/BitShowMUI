import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const SeasonsTable = ({ seasons }) => {
  return (
    <Table sx={{ width: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Episodes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {seasons.map((season) => (
          <TableRow key={season.id}>
            <TableCell>{season.number}.</TableCell>
            <TableCell>
              <Typography variant="body2">{season.premiereDate}</Typography>
              <Typography variant="body2">{season.endDate}</Typography>
            </TableCell>
            <TableCell>{season.episodeOrder}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SeasonsTable;
