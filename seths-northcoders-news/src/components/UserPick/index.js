import React from "react";
import { Input } from "react-materialize";

const UserPick = ({ users, defaultOption, handleUserPick }) => {
  users.sort((a, b) => {
    if (a.username < b.username) return -1;
    if (a.username > b.username) return 1;
    return 0;
  });
  return (
    <Input
      s={3}
      type="select"
      label="SELECT USER"
      defaultValue={defaultOption}
      onChange={handleUserPick}
    >
      <option value={defaultOption}>{defaultOption}</option>
      {users.map(user => {
        return (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        );
      })}
    </Input>
  );
};

export default UserPick;
