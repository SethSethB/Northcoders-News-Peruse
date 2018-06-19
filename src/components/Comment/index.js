import React from "react";
import { Button } from "react-materialize";
import DeleteButton from "../DeleteButton";
import moment from "moment";

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
      : created_by.username === username && username !== "guest";

    return (
      <div key={key} className="comment-container">
        <p className={"commentBody"} key={key + "1"}>
          {body}
        </p>
        <label key={key + "2"}>POSTED BY {created_by.username}</label>
        <label key={key + "3"}>
          {moment(created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </label>

        <span className="comment-votes">
          <Button
            onClick={() => handleCommentVote("up", _id)}
            floating
            small="true"
            className="amber lighten-1"
            waves="light"
            icon="thumb_up"
            disabled={disabled}
          />
          <p className="vote-count">{votes}</p>
          <Button
            onClick={() => handleCommentVote("down", _id)}
            floating
            small="true"
            className="amber lighten-1"
            waves="light"
            icon="thumb_down"
            disabled={disabled}
          />
          {disabled && (
            <span className="delete">
              <DeleteButton comment_id={_id} deleteComment={deleteComment} />
            </span>
          )}
        </span>
      </div>
    );
  }
}

export default Comment;
