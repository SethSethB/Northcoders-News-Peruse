import React from "react";
import * as api from "../../api";
import { Carousel } from "react-materialize";
import Loading from "../Loading";

class People extends React.Component {
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
    const { users } = this.state;
    const avatars = users.map(user => user.avatar_url);
    return !users.length ? (
      <Loading />
    ) : (
      <div>
        <Carousel images={avatars} />
      </div>
    );
  }
}

export default People;

// _id:
// "5b24b3f0adf97f24a0dad9d8"
// avatar_url:
// "http://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg"
// name:
// "Paul Grump"
// username:
// "grumpy19"
// GET /api/users/	"Returns list of all users"
// GET /api/users/:username	"Returns user profile for a given username"
// GET /api/users/:username/articles	"Returns list of all articles posted by given username"
