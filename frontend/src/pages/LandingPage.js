import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Manage Blue Collar Workforce Effectively</h1>
          <p>Supervisors can create tasks, assign to workers, and track progress.</p>
          <Button href="/signup" variant="primary" className="m-2">Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
