import React from "react";
import * as api from "../../api";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import UserPick from "../UserPick";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArticlePreview from "../ArticlePreview";
import SortButtons from "../SortButtons";

class People extends React.Component {
  state = {
    users: [],
    articles: [],
    currentSort: "title"
  };

  componentDidMount = async () => {
    const selectedUser = this.props.match.params.username;

    const {
      data: { users }
    } = await api.fetchUsers();

    const {
      data: { articles }
    } = await api.fetchArticlesByUsername(selectedUser);
    this.setState({ users, articles });
  };

  componentDidUpdate = async prevProps => {
    const selectedUser = this.props.match.params.username;
    if (prevProps.match.params.username !== selectedUser) {
      const {
        data: { articles }
      } = await api.fetchArticlesByUsername(selectedUser);

      this.setState({ articles });
    }
  };

  render() {
    const { users, articles, currentSort } = this.state;
    const {
      loggedIn: { username: loggedInUsername }
    } = this.props;

    const otherUsers = users.filter(
      user => user.username !== loggedInUsername && user.username !== "guest"
    );

    articles.sort((a, b) => {
      if (currentSort === "title") {
        if (a[currentSort] < b[currentSort]) return -1;
        if (a[currentSort] > b[currentSort]) return 1;
        return 0;
      } else {
        if (b[currentSort] < a[currentSort]) return -1;
        if (b[currentSort] > a[currentSort]) return 1;
        return 0;
      }
    });

    return !users.length ? (
      <Loading />
    ) : (
      <div>
        <UserPick
          users={otherUsers}
          defaultOption={loggedInUsername}
          handleUserPick={this.handleUserPick}
        />
        <SortButtons handleSort={this.handleSort} />
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
    this.props.history.push(`/people/${value}`);
  };

  handleSort = currentSort => {
    this.setState({
      currentSort
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
