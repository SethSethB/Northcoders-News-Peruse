import React from "react";
import { Row, Input, Button } from "react-materialize";
import TopicPick from "../TopicPick";
import UserChip from "../UserChip";

class PostArticle extends React.Component {
  state = {
    currentTopic: "New Topic",
    currentText: "",
    currentTitle: "",
    newTopicName: "",
    postingDisabled: false
  };

  componentDidMount = () => {
    const postingDisabled = this.props.loggedIn.username === "guest";

    this.setState({ postingDisabled });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      const postingDisabled = this.props.loggedIn.username === "guest";
      this.setState({ postingDisabled });
    }
  };

  render() {
    const {
      availableTopics,
      postArticle,
      loggedIn: { username, avatar_url }
    } = this.props;

    const {
      postingDisabled,
      currentTopic,
      currentText,
      currentTitle,
      newTopicName
    } = this.state;

    return (
      <div className="post-form">
        {!postingDisabled && (
          <Row>
            <UserChip username={username} avatar_url={avatar_url} />
          </Row>
        )}
        <Row>
          <TopicPick
            s={2}
            availableTopics={availableTopics}
            defaultOption="New Topic"
            handleTopicPick={this.handleTopicPick}
          />
          {this.state.currentTopic === "New Topic" && (
            <Input
              s={3}
              type="textarea"
              value={this.state.newTopicName}
              onChange={this.updateNewTopicName}
              label="Topic Name*"
            />
          )}
        </Row>

        <Row>
          <Input
            s={4}
            type="textarea"
            label="Title*"
            value={this.state.currentTitle}
            onChange={this.updateTitleText}
          />
        </Row>
        <Row>
          <Input
            s={8}
            label="Content*"
            type="textarea"
            value={this.state.currentText}
            onChange={this.updateArticleText}
          />
        </Row>

        <Button
          waves="light"
          className="amber lighten-1 black-text"
          onClick={() =>
            postArticle(currentTopic, currentText, currentTitle, newTopicName)
          }
          disabled={postingDisabled}
        >
          POST
        </Button>
        {postingDisabled && <p>You need to be logged-in to post</p>}
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
