import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const WorkerDashboard = () => {
  return (
    <Container className="mt-5">
      <h2>Worker Dashboard</h2>
      <Link to="/task-list">
        <Button variant="primary" className="m-2">View Assigned Tasks</Button>
      </Link>
    </Container>
  );
};

export default WorkerDashboard;
