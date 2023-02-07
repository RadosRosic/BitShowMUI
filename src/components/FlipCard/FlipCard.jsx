import { Typography } from "@mui/material";
import React, { useState } from "react";
import "./FlipCard.css";

const FlipCard = ({ actor }) => {
  const [frontFacing, setFrontFacing] = useState(true);

  const flipCardHandler = () => {
    setFrontFacing((prevState) => !prevState);
  };

  return (
    <>
      <div className="scene scene--card">
        <div
          className={cm("card", !frontFacing && "is-flipped")}
          onClick={flipCardHandler}
        >
          <div className="card__face card__face--front">
            <img src={`${actor?.person?.image?.medium}`} />
            {frontFacing && (
              <Typography color="#000">{actor?.person?.name}</Typography>
            )}
          </div>

          <div className="card__face card__face--back">
            <img src={`${actor?.character?.image?.medium}`} />
            {!frontFacing && (
              <Typography color="#000">{actor?.character?.name}</Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );

  function cm(...args) {
    return args.filter((v) => v).join(" ");
  } // class merger
};

export default FlipCard;
