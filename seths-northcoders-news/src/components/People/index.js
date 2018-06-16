import React from "react";
import * as api from "../../api";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import UserPick from "../UserPick";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArticlePreview from "../ArticlePreview";

class People extends React.Component {
  state = {
    users: [],
    articles: [],
    selectedUser: ""
  };

  componentDidMount = async () => {
    const {
      loggedIn: { username: loggedInUsername }
    } = this.props;

    const {
      data: { users }
    } = await api.fetchUsers();

    const {
      data: { articles }
    } = await api.fetchArticlesByUsername(loggedInUsername);
    this.setState({ users, articles, selectedUser: loggedInUsername });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { selectedUser } = this.state;
    if (prevState.selectedUser !== selectedUser) {
      const {
        data: { articles }
      } = await api.fetchArticlesByUsername(selectedUser);

      this.setState({ articles });
    }
  };

  render() {
    const { users, articles } = this.state;
    const {
      loggedIn: { username: loggedInUsername }
    } = this.props;
    const otherUsers = users.filter(user => user.username !== loggedInUsername);

    return !users.length ? (
      <Loading />
    ) : (
      <div>
        <UserPick
          users={otherUsers}
          defaultOption={loggedInUsername}
          handleUserPick={this.handleUserPick}
        />

        {articles.length ? (
          <Carousel
            width="70%"
            showThumbs={false}
            showIndicators={false}
            autoPlay
            useKeyboardArrows={true}
            infiniteLoop={true}
          >
            {articles.map(article => (
              <ArticlePreview key={article._id} article={article} />
            ))}
          </Carousel>
        ) : (
          <p>No Articles posted by this user</p>
        )}
      </div>
    );
  }

  handleUserPick = ({ target: { value } }) => {
    this.setState({
      selectedUser: value
    });
  };

  handleSort = ({ target: { value } }) => {
    this.setState({
      currentSort: value
    });
  };
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
