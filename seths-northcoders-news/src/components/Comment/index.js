import React from "react";

class Comment extends React.Component {
  render() {
    const {
      comment: { body, created_at, created_by, _id, votes }
    } = this.props;

    return (
      <div key={_id}>
        <label key={_id}>
          POSTED BY {created_by.username} AT {created_at}
        </label>
        <br />
        <label key={_id + 1}>VOTES {votes}</label>
        <p key={_id + 2}>{body}</p>
      </div>
    );
  }
}

export default Comment;

// comments:
// Array[13]
// 0:
// {…}
// __v:
// 0
// _id:
// "5b07cbb8ec3b271320dde50d"
// belongs_to:
// "5b07cbb8ec3b271320dde4f3"
// body:
// "Ea iure voluptas. Esse vero et dignissimos blanditiis commodi rerum dicta omnis modi."
// created_at:
// 1472375043865
// created_by:
// {…} .username
// votes:
// -1
