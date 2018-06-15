import React from "react";
import { Button } from "react-materialize";
import DeleteButton from "../DeleteButton";

class Comment extends React.Component {
  render() {
    const {
      comment: { body, created_at, created_by, _id, votes },
      handleCommentVote,
      username
    } = this.props;

    const disabled = !created_by
      ? false
      : created_by.username === username && username !== "guest"
        ? true
        : false;

    return (
      <div key={_id}>
        <p key={_id + 2}>{body}</p>
        <label key={_id}>
          POSTED BY {created_by.username} AT {created_at}
        </label>
        {disabled && (
          <DeleteButton comment_id={_id} deleteComment={this.deleteComment} />
        )}
        <br />
        <label key={_id + 1}>VOTES {votes}</label>

        <Button
          onClick={() => handleCommentVote("up", _id)}
          floating
          small="true"
          className="red accent-4"
          waves="light"
          icon="thumb_up"
          disabled={disabled}
        />
        <Button
          onClick={() => handleCommentVote("down", _id)}
          floating
          small="true"
          className="red accent-4"
          waves="light"
          icon="thumb_down"
          disabled={disabled}
        />
      </div>
    );
  }

  deleteComment = comment_id => {
    console.log(comment_id);
  };
}

export default Comment;
