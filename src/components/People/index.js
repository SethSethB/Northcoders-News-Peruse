import React from "react";
import * as api from "../../api";
import Loading from "../Loading";
import UserPick from "../UserPick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArticleCarousel from "../ArticleCarousel";
import SortButtons from "../SortButtons";
import { Row } from "react-materialize";
import articleSort from "../../utils";

class People extends React.Component {
  state = {
    users: [],
    articles: [],
    currentSort: "title"
  };

  componentDidMount = async () => {
    const selectedUser = this.props.match.params.username;
    const { currentSort } = this.state;

    try {
      const {
        data: { users }
      } = await api.fetchUsers();

      const {
        data: { articles }
      } = await api.fetchArticlesByUsername(selectedUser);

      articleSort(articles, currentSort);
      this.setState({ users, articles });
    } catch (err) {
      if (err.response.status === 404 || 400) this.props.history.push("/404");
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const selectedUser = this.props.match.params.username;
    const { currentSort } = this.state;

    if (
      prevProps.match.params.username !== selectedUser ||
      prevState.currentSort !== currentSort
    ) {
      const {
        data: { articles }
      } = await api.fetchArticlesByUsername(selectedUser);

      articleSort(articles, currentSort);
      this.setState({ articles });
    }
  };

  render() {
    const { users, articles } = this.state;

    const selectedUser = this.props.match.params.username;

    return !users.length ? (
      <Loading />
    ) : (
      <div>
        <Row>
          <UserPick
            users={users}
            defaultOption={selectedUser}
            handleUserPick={this.handleUserPick}
          />
        </Row>

        <div className="preview-display">
          <Row>
            <SortButtons handleSort={this.handleSort} />
          </Row>
          {articles.length ? (
            <ArticleCarousel articles={articles} />
          ) : (
            <p>No Articles posted by this user</p>
          )}
        </div>
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
