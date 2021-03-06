import React from "react";

class UserPick extends React.Component {
  render() {
    const { users, defaultOption, handleUserPick } = this.props;

    users.sort((a, b) => {
      if (a.username < b.username) return -1;
      if (a.username > b.username) return 1;
      return 0;
    });
    return (
      <div className="selector">
        <label>CHOOSE USER</label>
        <select
          onChange={handleUserPick}
          defaultValue={defaultOption}
          className="browser-default"
        >
          {this.userOptions(users)}
        </select>
      </div>
    );
  }

  userOptions = users => {
    return users.map(user => {
      return (
        <option key={user.username} value={user.username}>
          {user.username}
        </option>
      );
    });
  };
}

export default UserPick;
