import React from "react";
import { Card, Col, Chip } from "react-materialize";
import { Link } from "react-router-dom";

const ArticlePreview = ({
  article: { _id, title, created_by, votes, comments, body }
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
          <Chip key={_id + 3}>
            <img src={created_by.avatar_url} alt="avatar" />
            {created_by.username}
          </Chip>
          <br />
          {body}
        </Card>
      </Link>
    </Col>
  );
};

export default ArticlePreview;
