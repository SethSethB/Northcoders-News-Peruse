import React, { Component } from "react";
import TopicPick from "../TopicPick";
import SortButtons from "../SortButtons";
import articleSort from "../../utils";

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
    const { currentSort } = this.state;

    try {
      const {
        data: { articles }
      } =
        currentTopic === "ALL"
          ? await api.fetchArticles()
          : await api.fetchArticlesByTopic(currentTopic);

      articleSort(articles, currentSort);
      this.setState({ articles });
    } catch (err) {
      if (err.response.status === 404 || 400) this.props.history.push("/404");
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const currentTopic = this.props.match.params.topic;
    const { currentSort } = this.state;

    if (
      prevProps.match.params.topic !== currentTopic ||
      prevState.currentSort !== currentSort
    ) {
      try {
        const {
          data: { articles }
        } =
          currentTopic === "ALL"
            ? await api.fetchArticles()
            : await api.fetchArticlesByTopic(currentTopic);

        articleSort(articles, currentSort);
        this.setState({ articles });
      } catch (err) {
        if (err.response.status === 404 || 400) this.props.history.push("/404");
      }
    }
  };

  render() {
    const { availableTopics } = this.props;
    const { articles } = this.state;

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
