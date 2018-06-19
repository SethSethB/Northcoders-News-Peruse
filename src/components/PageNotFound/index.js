import React from "react";
import { Button } from "react-materialize";

const PageNotFound = props => {
  return (
    <div className="no-content">
      <h2>NOTHING TO PERUSE HERE I'M AFRAID</h2>
      <Button
        className="amber lighten-1 black-text "
        onClick={() => props.history.push("/peruse/ALL")}
      >
        CARRY ON...
      </Button>
    </div>
  );
};

export default PageNotFound;
