import React from "react";
import * as api from "../../api";

class UserPick extends React.Component {
  state = {
    users: []
  };

  componentDidMount = async () => {
    const {
      data: { users }
    } = await api.fetchUsers();

    this.setState({ users });
  };

  render() {
    return <h1>USERLIST</h1>;
  }
}

export default UserPick;

// GET /api/users/	"Returns list of all users"
// GET /api/users/:username	"Returns user profile for a given username"
// GET /api/users/:username/articles	"Returns list of all articles posted by given username"
