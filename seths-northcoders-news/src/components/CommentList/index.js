import React from "react";
import * as api from "../../api";
import PostComment from "../PostComment";
import Comment from "../Comment";

class CommentList extends React.Component {
  state = { comments: [] };

  componentDidMount = async () => {
    const { articleId } = this.props;
    const commentsRes = await api.fetchComments(articleId);

    this.setState({
      comments: commentsRes.data.comments
    });
  };

  render() {
    const { comments } = this.state;

    comments.sort((a, b) => {
      if (b.created_at < a.created_at) return -1;
      if (b.created_at > a.created_at) return 1;
      return 0;
    });

    return (
      <div>
        <PostComment postComment={this.postComment} />
        <h1 className="cyan lighten-1">COMMENTS</h1>
        {comments.map(comment => (
          <Comment
            username={this.props.username}
            key={comment._id}
            comment={comment}
            handleCommentVote={this.handleCommentVote}
          />
        ))}
      </div>
    );
  }

  postComment = comment => {
    const { articleId } = this.props;
    const { username } = this.props;
    api.postComment(comment, articleId, username);
    const temp = Date.now();

    const { comments } = this.state;
    comments.push({
      body: comment,
      created_by: { username },
      _id: temp,
      created_at: temp,
      votes: 0
    });

    this.setState({
      comments
    });
  };

  handleCommentVote = (vote, commentId) => {
    const { comments } = this.state;

    const votedComment = comments.findIndex(
      comment => comment._id === commentId
    );

    api.commentVote(vote, commentId);

    vote === "up"
      ? comments[votedComment].votes++
      : comments[votedComment].votes--;

    this.setState({
      comments
    });
  };
}

export default CommentList;
