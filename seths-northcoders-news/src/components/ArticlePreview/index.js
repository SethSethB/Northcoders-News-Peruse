import React from "react";
import { Card, Col } from "react-materialize";
import { Link, Route } from "react-router-dom";
import Article from "../Article";

const ArticlePreview = ({ article }) => {
  return (
    <Col m={3} s={1}>
      <Link to={`/articles/${article._id}`}>
        <Card
          className="red lighten-2"
          textClassName="white-text"
          title={article.title}
          actions={[
            <Link to={`/people/${article.NEEDPERSON}`}>
              By {article.created_by.username}
            </Link>,
            <p>VOTES: {article.votes}</p>,
            <p>COMMENTS: {article.comments} </p>
          ]}
        >
          {`${article.body.slice(0, 150)}...`}
        </Card>
      </Link>
      <Route
        path="/articles/:articleId"
        render={props => <Article {...props} loggedIn={this.state.loggedIn} />}
      />
    </Col>
  );
};

export default ArticlePreview;
