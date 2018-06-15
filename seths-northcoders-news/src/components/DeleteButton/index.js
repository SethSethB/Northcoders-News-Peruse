import React from "react";
import { Button } from "react-materialize";

const DeleteButton = ({ deleteComment }) => {
  return (
    <Button
      onClick={deleteComment}
      floating
      small="true"
      className="grey darken-4"
      waves="light"
      icon="delete"
    />
  );
};

export default DeleteButton;
