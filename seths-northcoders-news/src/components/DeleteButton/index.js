import React from "react";
import { Button } from "react-materialize";

const DeleteButton = ({ deleteComment, comment_id }) => {
  return (
    <Button
      onClick={() => deleteComment(comment_id)}
      floating
      small="true"
      className="grey darken-4"
      waves="light"
      icon="delete"
    />
  );
};

export default DeleteButton;
