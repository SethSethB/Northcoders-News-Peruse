import React from "react";
import * as api from "../../api";
import Comment from "../Comment";
import Loading from "../Loading";
import PostComment from "../PostComment";
import { Icon, Button } from "react-materialize";

class Article extends React.Component {
  state = { article: {}, comments: [] };

  componentDidMount = async () => {
    const articleID = this.props.match.params.articleId;
    const articleRes = await api.fetchArticle(articleID);
    const commentsRes = await api.fetchComments(articleID);

    this.setState({
      article: articleRes.data,
      comments: commentsRes.data.comments
    });
  };
  render() {
    const { loggedIn } = this.props;
    const { article, comments } = this.state;

    comments.sort((a, b) => {
      if (b.created_at < a.created_at) return -1;
      if (b.created_at > a.created_at) return 1;
      return 0;
    });

    return (
      <div>
        <h1 className="cyan lighten-1">{article.title}</h1>
        <h4>{article.belongs_to}</h4>
        <article>{article.body}</article>
        <PostComment />
        <h3>
          VOTES {article.votes}{" "}
          <Button
            onClick={() => this.handleVote("up")}
            floating
            large
            className="red accent-4"
            waves="light"
            icon="thumb_up"
          />
          <Button
            onClick={() => this.handleVote("down")}
            floating
            large
            className="red accent-4"
            waves="light"
            icon="thumb_down"
          />
        </h3>{" "}
        <h1 className="cyan lighten-1">COMMENTS</h1>
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
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
