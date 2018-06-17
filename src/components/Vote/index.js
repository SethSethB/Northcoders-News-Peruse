import React from "react";
import { Button } from "react-materialize";

function Vote({ handleVote, disabled, votes }) {
  return (
    <h3 className="article-votes">
      <Button
        onClick={() => handleVote("up")}
        floating
        large
        className="amber lighten-1"
        waves="light"
        icon="thumb_up"
        disabled={disabled}
      />
      <p className="vote-count">{votes}</p>
      <Button
        onClick={() => handleVote("down")}
        floating
        large
        className="amber lighten-1"
        waves="light"
        icon="thumb_down"
        disabled={disabled}
      />
    </h3>
  );
}

export default Vote;
