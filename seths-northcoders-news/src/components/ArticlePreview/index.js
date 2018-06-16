import React from "react";
import { Card, Col } from "react-materialize";
import { Link } from "react-router-dom";
import UserChip from "../UserChip";

const ArticlePreview = ({
  article: {
    _id,
    title,
    created_by: { avatar_url, username },
    votes,
    comments,
    body
  }
}) => {
  return (
    <Col key={_id} m={3} s={4}>
      <Link key={_id} to={`/articles/${_id}`}>
        <Card
          key={_id}
          className="red accent-4"
          textClassName="white-text"
          title={title}
        >
          <p key={_id + 1}>VOTES: {votes}</p>
          <p key={_id + 2}>COMMENTS: {comments} </p>
          <UserChip key={_id + 3} username={username} avatar_url={avatar_url} />
          <br />
          {body}
        </Card>
        <p className="legend">Click to Read more</p>
      </Link>
    </Col>
  );
};

export default ArticlePreview;
