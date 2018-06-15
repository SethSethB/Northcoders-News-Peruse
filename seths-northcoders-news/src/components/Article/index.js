import React from "react";
import * as api from "../../api";

import Loading from "../Loading";

import CommentList from "../CommentList";
import { Button } from "react-materialize";

class Article extends React.Component {
  state = { article: {} };

  componentDidMount = async () => {
    const articleId = this.props.match.params.articleId;
    const articleRes = await api.fetchArticle(articleId);

    this.setState({
      article: articleRes.data
    });
  };

  render() {
    const articleId = this.props.match.params.articleId;
    const {
      loggedIn: { username }
    } = this.props;
    const { article } = this.state;

    const disabled = !article.created_by
      ? false
      : article.created_by.username === username && username !== "guest"
        ? true
        : false;

    return !article.title ? (
      <Loading />
    ) : (
      <div>
        <h1 className="cyan lighten-1">{article.title}</h1>
        <h4>{article.belongs_to}</h4>
        <article>{article.body}</article>

        <h3>
          VOTES {article.votes}
          <Button
            onClick={() => this.handleVote("up")}
            floating
            large
            className="red accent-4"
            waves="light"
            icon="thumb_up"
            disabled={disabled}
          />
          <Button
            onClick={() => this.handleVote("down")}
            floating
            large
            className="red accent-4"
            waves="light"
            icon="thumb_down"
            disabled={disabled}
          />
        </h3>
        <CommentList articleId={articleId} username={username} />
      </div>
    );
  }

  handleVote = vote => {
    const articleID = this.props.match.params.articleId;

    api.articleVote(vote, articleID);

    const votes =
      vote === "up"
        ? this.state.article.votes + 1
        : this.state.article.votes - 1;

    this.setState({
      article: {
        ...this.state.article,
        votes
      }
    });
  };
}

export default Article;
