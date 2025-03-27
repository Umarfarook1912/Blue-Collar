import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SupervisorDashboard = () => {
  return (
    <Container className="mt-5">
      <h2>Supervisor Dashboard</h2>
      <Link to="/create-task">
        <Button variant="primary" className="m-2">Create Task</Button>
      </Link>
      <Link to="/task-list">
        <Button variant="secondary" className="m-2">View Tasks</Button>
      </Link>
    </Container>
  );
};

export default SupervisorDashboard;
