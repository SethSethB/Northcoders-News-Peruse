import React from "react";
import { Row, Input, Button } from "react-materialize";

class PostComment extends React.Component {
  state = {
    commentText: ""
  };

  render() {
    return (
      <div className="comment-post">
        <Row>
          <Input
            s={12}
            label="Post Comment"
            type="textarea"
            value={this.state.commentText}
            onChange={this.updateCommentText}
          />
          <Button
            s={2}
            waves="light"
            className="amber lighten-1 black-text"
            onClick={this.submitComment}
          >
            POST
          </Button>
        </Row>
      </div>
    );
  }
  updateCommentText = ({ target: { value } }) => {
    this.setState({
      commentText: value
    });
  };

  submitComment = () => {
    const { postComment } = this.props;
    postComment(this.state.commentText);
    this.setState({
      commentText: ""
    });
  };
}

export default PostComment;
