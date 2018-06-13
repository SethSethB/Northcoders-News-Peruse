import React from "react";
import { Card, Col } from "react-materialize";
import { Link } from "react-router-dom";

const ArticlePreview = ({ article }) => {
  return (
    <Col m={3} s={1}>
      <Link to={`/articles/${article._id}`}>
        <Card
          className="red lighten-2"
          textClassName="white-text"
          title={article.comments}
          actions={[
            <Link to={`/people/${article.NEEDPERSON}`}>
              By {article.created_by.username}
            </Link>
          ]}
        >
          {`${article.body.slice(0, 150)}...`}
        </Card>
      </Link>
    </Col>
  );
};

export default ArticlePreview;
