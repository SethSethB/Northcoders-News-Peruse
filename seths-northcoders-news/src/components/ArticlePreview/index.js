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
        <Card key={_id} textClassName="black-text" title={title}>
          {" "}
          <p key={_id + 1}>VOTES: {votes}</p>
          <p key={_id + 2}>COMMENTS: {comments} </p>
          {body}
        </Card>
      </Link>
    </Col>
  );
};

export default ArticlePreview;
