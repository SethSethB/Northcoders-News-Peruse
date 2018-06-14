import React from "react";
import { Button } from "react-materialize";

class Comment extends React.Component {
  render() {
    const {
      comment: { body, created_at, created_by, _id, votes },
      handleCommentVote
    } = this.props;

    return (
      <div key={_id}>
        <label key={_id}>
          POSTED BY {created_by.username} AT {created_at}
        </label>
        <br />
        <label key={_id + 1}>VOTES {votes}</label>
        <Button
          onClick={() => handleCommentVote("up", _id)}
          floating
          small="true"
          className="red accent-4"
          waves="light"
          icon="thumb_up"
        />
        <Button
          onClick={() => handleCommentVote("down", _id)}
          floating
          small="true"
          className="red accent-4"
          waves="light"
          icon="thumb_down"
        />
        <p key={_id + 2}>{body}</p>
      </div>
    );
  }
}

export default Comment;
