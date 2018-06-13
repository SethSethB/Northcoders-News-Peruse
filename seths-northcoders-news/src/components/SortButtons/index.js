import React from "react";
import { Button, Icon } from "react-materialize";

const SortButton = ({ handleSort }) => {
  return (
    <div>
      <Button waves="light" value="title" onClick={handleSort}>
        Title
      </Button>
      <Button waves="light" value="votes" onClick={handleSort}>
        Popularity
      </Button>
      <Button waves="light" value="comments" onClick={handleSort}>
        Most Commented
      </Button>
    </div>
  );
};

export default SortButton;
