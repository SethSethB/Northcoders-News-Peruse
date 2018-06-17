import React from "react";
import { Chip } from "react-materialize";

function UserChip({ username, avatar_url }) {
  return (
    <Chip>
      <img src={avatar_url} alt="avatar" />
      {username}
    </Chip>
  );
}

export default UserChip;
