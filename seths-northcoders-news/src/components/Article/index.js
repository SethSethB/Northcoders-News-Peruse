import React from "react";
import * as api from "../../api";
import Loading from "../Loading";

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

    return <h1 className="cyan lighten-1">ARTICLE HERE</h1>;
  }
}

export default Article;
