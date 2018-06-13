import React from "react";
import axios from "axios";

class UserPick extends React.Component {
  state = {
    users: []
  };

  componentDidMount = async () => {
    const {
      data: { users }
    } = await this.fetchUsers();

    this.setState({ users });
  };

  render() {
    return <h1>USERLIST</h1>;
  }

  fetchUsers = async () => {
    const users = await axios.get(
      "https://seth-northcoders-news.herokuapp.com/api/users"
    );

    return users;
  };
}

export default UserPick;
