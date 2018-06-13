import React, { Component } from "react";
import TopicPick from "../TopicPick";
import SortButtons from "../SortButtons";
import ArticlePreview from "../ArticlePreview";
import { Row } from "react-materialize";
import axios from "axios";
import Loading from "../Loading";

class ArticleDisplay extends Component {
  state = {
    currentTopic: "ALL",
    currentSort: "",
    articles: []
  };

  componentDidMount = async () => {
    const data = await this.fetchArticles();
    const articles = [...data.data.articles];
    this.setState({ articles });
  };

  render() {
    const { loggedIn, availableTopics } = this.props;
    const { articles, currentTopic, currentSort } = this.state;

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

    const selectedArticles = articles.filter(article => {
      if (currentTopic === "ALL") return true;
      return article.belongs_to === currentTopic;
    });

    return !availableTopics.length ? (
      <Loading />
    ) : (
      <div>
        <Row>
          <TopicPick
            availableTopics={availableTopics}
            defaultOption="ALL"
            handleTopicPick={this.handleTopicPick}
          />
        </Row>

        <p>SORT BY</p>
        <SortButtons handleSort={this.handleSort} />
        <Row>
          {selectedArticles.map(article => (
            <ArticlePreview article={article} />
          ))}
        </Row>
      </div>
    );
  }

  handleTopicPick = ({ target: { value } }) => {
    this.setState({
      currentTopic: value
    });
  };

  handleSort = ({ target: { value } }) => {
    this.setState({
      currentSort: value
    });
  };

  fetchArticles = async () => {
    const articles = await axios.get(
      "https://seth-northcoders-news.herokuapp.com/api/articles"
    );

    return articles;
  };
}

export default ArticleDisplay;
