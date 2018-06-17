import React from "react";
import { Row, Col, ProgressBar } from "react-materialize";

const Loading = () => {
  return (
    <Row>
      <Col s={12}>
        <ProgressBar className="indigo" progress={70} />
      </Col>
      <Col s={12}>
        <ProgressBar className="indigo" />
      </Col>
    </Row>
  );
};

export default Loading;
