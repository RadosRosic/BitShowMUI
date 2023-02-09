import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SeasonsInfo from "./SeasonsInfo";
import CastList from "./CastList";
import ShowImages from "./ShowImages";

export default function SimpleAccordion({ show, cast }) {
  const [expanded, setExpanded] = useState("");
  const handleAccordion = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === "about"}
        onChange={handleAccordion("about")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>About</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h6"
            component="p"
            dangerouslySetInnerHTML={{ __html: show?.summary }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "seasons"}
        onChange={handleAccordion("seasons")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Seasons</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SeasonsInfo />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "cast"}
        onChange={handleAccordion("cast")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Cast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CastList cast={cast} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "galery"}
        onChange={handleAccordion("galery")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Galery</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShowImages />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
