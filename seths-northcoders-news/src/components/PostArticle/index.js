import React from "react";
import { Row, Input, Button } from "react-materialize";
import TopicPick from "../TopicPick";
import * as api from "../../api";

class PostArticle extends React.Component {
  state = {
    currentTopic: "New Topic",
    currentText: "",
    currentTitle: "",
    newTopicName: ""
  };

  render() {
    const { loggedIn, availableTopics, postArticle } = this.props;

    const {
      currentTopic,
      currentText,
      currentTitle,
      newTopicName
    } = this.state;

    return (
      <div>
        <Row>
          <TopicPick
            availableTopics={availableTopics}
            defaultOption="New Topic"
            handleTopicPick={this.handleTopicPick}
          />
          {this.state.currentTopic === "New Topic" && (
            <Input
              s={2}
              type="textarea"
              value={this.state.newTopicName}
              onChange={this.updateNewTopicName}
              label="Topic Name*"
            />
          )}
        </Row>

        <Row>
          <Input
            s={5}
            type="textarea"
            label="Title*"
            value={this.state.currentTitle}
            onChange={this.updateTitleText}
          />
        </Row>
        <Row>
          <Input
            s={5}
            label="Content*"
            type="textarea"
            value={this.state.currentText}
            onChange={this.updateArticleText}
          />
        </Row>

        <Button
          waves="light"
          className="grey darken-4"
          onClick={() =>
            postArticle(currentTopic, currentText, currentTitle, newTopicName)
          }
        >
          POST
        </Button>
      </div>
    );
  }

  handleTopicPick = ({ target: { value } }) => {
    this.setState({
      currentTopic: value
    });
  };

  updateArticleText = ({ target: { value } }) => {
    this.setState({
      currentText: value
    });
  };

  updateNewTopicName = ({ target: { value } }) => {
    this.setState({
      newTopicName: value
    });
  };

  updateTitleText = ({ target: { value } }) => {
    this.setState({
      currentTitle: value
    });
  };
}

export default PostArticle;
