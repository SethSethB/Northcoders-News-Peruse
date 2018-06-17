import React from "react";
import { Button, Icon } from "react-materialize";

const SortButton = ({ handleSort }) => {
  return (
    <div>
      <label>SORT BY</label>
      <Button
        className="amber lighten-1 black-text sort"
        waves="light"
        value="title"
        onClick={() => handleSort("title")}
        icon="text_rotation_none"
      />

      <Button
        className="amber lighten-1 black-text sort"
        waves="light"
        value="votes"
        onClick={() => handleSort("votes")}
        icon="thumbs_up_down"
      />

      <Button
        className="amber lighten-1 black-text sort"
        waves="light"
        value="comments"
        onClick={() => handleSort("comments")}
        icon="insert_comment"
      />
    </div>
  );
};

export default SortButton;
