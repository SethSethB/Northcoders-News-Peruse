import React from "react";
import { Row, Input, Button } from "react-materialize";
import TopicPick from "../TopicPick";

class PostArticle extends React.Component {
  state = {
    currentTopic: "New Topic",
    currentText: "",
    currentTitle: "",
    newTopicName: ""
  };

  render() {
    const { loggedIn, availableTopics } = this.props;

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
              label="New Topic Name"
            />
          )}
        </Row>

        <Row>
          <Input
            s={5}
            type="textarea"
            label="Title"
            value={this.state.currentTitle}
            onChange={this.updateTitleText}
          />
        </Row>
        <Row>
          <Input
            s={5}
            label="Article"
            type="textarea"
            value={this.state.currentText}
            onChange={this.updateArticleText}
          />
        </Row>

        <Button waves="light" className="red" onClick={this.postArticle}>
          POST
        </Button>
      </div>
    );
  }

  postArticle = e => {
    console.log("FunctionCall to api");

    this.setState({
      currentTopic: "newTopic",
      currentText: "",
      currentTitle: "",
      newTopicName: ""
    });
  };

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
