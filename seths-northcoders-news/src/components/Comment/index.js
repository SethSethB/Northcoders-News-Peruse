import React from "react";
import { Button } from "react-materialize";
import DeleteButton from "../DeleteButton";

class Comment extends React.Component {
  render() {
    const {
      comment: { key, body, created_at, created_by, _id, votes },
      handleCommentVote,
      username,
      deleteComment
    } = this.props;

    const disabled = !created_by
      ? false
      : created_by.username === username && username !== "guest"
        ? true
        : false;

    return (
      <div key={key}>
        <p key={key + "1"}>{body}</p>
        <label key={key + "2"}>
          POSTED BY {created_by.username} AT {created_at}
        </label>
        {disabled && (
          <DeleteButton comment_id={_id} deleteComment={deleteComment} />
        )}
        <br />
        <label key={key + "3"}>VOTES {votes}</label>

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
}

export default Comment;
