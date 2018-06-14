import React from "react";
import { Row, Input, Button } from "react-materialize";

class PostComment extends React.Component {
  state = {
    commentText: ""
  };

  render() {
    const { postComment } = this.props;
    return (
      <div>
        <Row>
          <Input
            s={4}
            label="Post Comment"
            type="textarea"
            value={this.state.commentText}
            onChange={this.updateCommentText}
          />
          <Button
            waves="light"
            className="grey darken-4"
            onClick={() => postComment(this.state.commentText)}
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

  postComment = () => {
    const { commentText } = this.state;
    console.log(commentText);
  };
}

export default PostComment;
