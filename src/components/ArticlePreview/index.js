import React from "react";
import { Card, Col, Icon } from "react-materialize";
import { Link } from "react-router-dom";

const ArticlePreview = ({ article: { _id, title, votes, comments, body } }) => {
  return (
    <Col key={_id} m={3} s={4}>
      <Link key={_id} to={`/articles/${_id}`}>
        <Card key={_id} textClassName="black-text" title={title}>
          <span className="preview-icon" key={_id + 1}>
            <Icon>thumbs_up_down</Icon>
            {votes}
          </span>
          <span className="preview-icon" key={_id + 2}>
            <Icon>insert_comment</Icon>
            {comments}
          </span>
          <br />
          {body}
        </Card>
      </Link>
    </Col>
  );
};

export default ArticlePreview;
