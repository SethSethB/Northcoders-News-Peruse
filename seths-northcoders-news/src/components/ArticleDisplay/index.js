import React, { Component } from "react";
import TopicPick from "../TopicPick";
import SortButtons from "../SortButtons";
import ArticlePreview from "../ArticlePreview";
import { Row } from "react-materialize";
import * as api from "../../api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Loading from "../Loading";

class ArticleDisplay extends Component {
  state = {
    currentSort: "title",
    articles: []
  };

  componentDidMount = async () => {
    const currentTopic = this.props.match.params.topic;

    const {
      data: { articles }
    } =
      currentTopic === "ALL"
        ? await api.fetchArticles()
        : await api.fetchArticlesByTopic(currentTopic);

    this.setState({ articles });
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

        <SortButtons handleSort={this.handleSort} />

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
      </div>
    );
  }

  handleTopicPick = ({ target: { value } }) => {
    this.props.history.push(`/peruse/${value}`);
  };

  handleSort = ({ target: { value } }) => {
    this.setState({
      currentSort: value
    });
  };
}

export default ArticleDisplay;
