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
        <h2 className="cyan lighten-1 commentHeader">COMMENTS</h2>
        <PostComment postComment={this.postComment} />
        {comments.map((comment, i) => (
          <Comment
            username={this.props.username}
            key={i}
            comment={comment}
            handleCommentVote={this.handleCommentVote}
            deleteComment={this.deleteComment}
          />
        ))}
      </div>
    );
  }

  deleteComment = comment_id => {
    api.deleteCommentFromDB(comment_id).then(() => {
      const comments = this.state.comments.filter(
        comment => comment._id !== comment_id
      );
      this.setState({
        comments
      });
    });
  };

  postComment = comment => {
    if (!comment) return null;
    const { articleId } = this.props;
    const { username } = this.props;
    api.postComment(comment, articleId, username).then(({ data }) => {
      const { comments } = this.state;
      const { created_by } = data;
      comments.unshift({
        ...data,
        created_by: { _id: created_by, username }
      });

      this.setState({
        comments
      });
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
