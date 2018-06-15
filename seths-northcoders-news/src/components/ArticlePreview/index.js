import React from "react";
import { Card, Col } from "react-materialize";
import { Link } from "react-router-dom";

const ArticlePreview = ({ article }) => {
  return (
    <Col key={article._id} m={3} s={4}>
      <Link key={article._id} to={`/articles/${article._id}`}>
        <Card
          key={article._id}
          className="red accent-4"
          textClassName="white-text"
          title={article.title}
          actions={[
            <p key={article._id + 1}>
              CREATED BY: {article.created_by.username}
            </p>,
            <p key={article._id + 2}>VOTES: {article.votes}</p>,
            <p key={article._id + 3}>COMMENTS: {article.comments} </p>
          ]}
        >
          {`${article.body.slice(0, 200)}...`}
        </Card>
      </Link>
    </Col>
  );
};

export default ArticlePreview;
