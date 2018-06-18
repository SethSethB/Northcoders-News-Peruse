import React, { Component } from "react";
import TopicPick from "../TopicPick";
import SortButtons from "../SortButtons";

import { Row } from "react-materialize";
import * as api from "../../api";

import Loading from "../Loading";
import ArticleCarousel from "../ArticleCarousel";

class ArticleDisplay extends Component {
  state = {
    currentSort: "title",
    articles: []
  };

  componentDidMount = async () => {
    const currentTopic = this.props.match.params.topic;

    try {
      const {
        data: { articles }
      } =
        currentTopic === "ALL"
          ? await api.fetchArticles()
          : await api.fetchArticlesByTopic(currentTopic);

      this.setState({ articles });
    } catch (err) {
      if (err.response.status === 404 || 400) this.props.history.push("/404");
    }
  };

  componentDidUpdate = async prevProps => {
    const currentTopic = this.props.match.params.topic;

    if (prevProps.match.params.topic !== currentTopic) {
      const data =
        currentTopic === "ALL"
          ? await api.fetchArticles()
          : await api.fetchArticlesByTopic(currentTopic);
      const articles = [...data.data.articles];
      this.setState({ articles });
    }
  };

  render() {
    const { availableTopics } = this.props;
    const { articles, currentSort } = this.state;

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
        <div className="preview-display">
          <Row>
            <SortButtons handleSort={this.handleSort} />
          </Row>

          <ArticleCarousel articles={articles} />
        </div>
      </div>
    );
  }

  handleTopicPick = ({ target: { value } }) => {
    this.props.history.push(`/peruse/${value}`);
  };

  handleSort = currentSort => {
    this.setState({
      currentSort
    });
  };
}

export default ArticleDisplay;
