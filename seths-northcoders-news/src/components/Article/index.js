import React from "react";
import axios from "axios";
import Loading from "../Loading";

class Article extends React.Component {
  state = { article: {}, comments: [] };

  componentDidMount = async () => {
    const articleID = this.props.match.params.articleId;
    const article = await this.fetchArticle(articleID);
    const comments = await this.fetchComments(articleID);

    this.setState({ article: article.data, comments: comments.data.comments });
  };
  render() {
    const { loggedIn } = this.props;
    const { article, comments } = this.state;

    return <h1 className="cyan lighten-1">ARTICLE HERE</h1>;
  }

  fetchArticle = async id => {
    const articles = await axios.get(
      `https://seth-northcoders-news.herokuapp.com/api/articles/${id}`
    );
    return articles;
  };

  fetchComments = async id => {
    const comments = await axios.get(
      `https://seth-northcoders-news.herokuapp.com/api/articles/${id}/comments`
    );
    return comments;
  };
}

export default Article;
