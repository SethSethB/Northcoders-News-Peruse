import React from "react";
import { Button } from "react-materialize";

const SortButton = ({ handleSort }) => {
  return (
    <div>
      <label>SORT BY</label>
      <Button
        className="amber lighten-1 sort"
        waves="light"
        value="title"
        onClick={handleSort}
      >
        Title
      </Button>
      <Button
        className="amber lighten-1 sort"
        waves="light"
        value="votes"
        onClick={handleSort}
      >
        Popularity
      </Button>
      <Button
        className="amber lighten-1 sort"
        waves="light"
        value="comments"
        onClick={handleSort}
      >
        Most Commented
      </Button>
    </div>
  );
};

export default SortButton;
