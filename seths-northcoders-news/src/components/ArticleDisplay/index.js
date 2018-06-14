import React, { Component } from "react";
import TopicPick from "../TopicPick";
import SortButtons from "../SortButtons";
import ArticlePreview from "../ArticlePreview";
import { Row } from "react-materialize";
import * as api from "../../api";

import Loading from "../Loading";

class ArticleDisplay extends Component {
  state = {
    currentTopic: "ALL",
    currentSort: "",
    articles: []
  };

  componentDidMount = async () => {
    const { currentTopic } = this.state;
    const data =
      currentTopic === "ALL"
        ? await api.fetchArticles()
        : await api.fetchArticlesByTopic(currentTopic);
    const articles = [...data.data.articles];
    this.setState({ articles });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { currentTopic } = this.state;
    if (prevState.currentTopic !== currentTopic) {
      const data =
        currentTopic === "ALL"
          ? await api.fetchArticles()
          : await api.fetchArticlesByTopic(currentTopic);
      const articles = [...data.data.articles];
      this.setState({ articles });
    }
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

    return !articles.length ? (
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

        <label>SORT BY</label>
        <SortButtons handleSort={this.handleSort} />
        <Row>
          {selectedArticles.map(article => (
            <ArticlePreview key={article._id} article={article} />
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
}

export default ArticleDisplay;
