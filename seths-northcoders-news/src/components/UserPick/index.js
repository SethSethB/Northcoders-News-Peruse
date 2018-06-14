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
