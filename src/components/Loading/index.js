import React from "react";
import { Row, Col, ProgressBar } from "react-materialize";

const Loading = () => {
  return (
    <Row>
      <Col s={12}>
        <ProgressBar className="cyan lighten-1" progress={70} />
      </Col>
      <Col s={12}>
        <ProgressBar className="amber" />
      </Col>
    </Row>
  );
};

export default Loading;
