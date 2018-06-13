import React from "react";
import { Card, Col } from "react-materialize";
import { Link } from "react-router-dom";

const ArticlePreview = ({ article }) => {
  return (
    <Col m={3} s={1}>
      <Link to={`/articles/${article._id}`}>
        <Card
          className="red accent-4"
          textClassName="white-text"
          title={article.title}
          actions={[
            <Link to={`/people/${article.created_by.username}`}>
              By {article.created_by.username}
            </Link>,
            <p>VOTES: {article.votes}</p>,
            <p>COMMENTS: {article.comments} </p>
          ]}
        >
          {`${article.body.slice(0, 150)}...`}
        </Card>
      </Link>
    </Col>
  );
};

export default ArticlePreview;
