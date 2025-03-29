import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTasks, FaUserCog, FaClipboardCheck } from "react-icons/fa";
import "./Dashboard.css";

const WorkerDashboard = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">
        <FaUserCog className="me-2" /> Worker Dashboard
      </h2>
      
      <Card className="custom-card shadow-lg p-4 mb-4">
        <Card.Body>
          <h5 className="text-white">Welcome, Worker!</h5>
          <p className="text-white">Your assigned tasks are listed below. Make sure to complete them on time.</p>
        </Card.Body>
      </Card>

      <Card className="custom-card shadow-lg p-4 mt-4 text-center">
        <h5 className="text-white">Task Overview</h5>
        <Row className="mt-3 text-center">
          <Col xs={12} md={6} className="mb-3">
            <Card className="p-3 shadow-sm custom-inner-card">
              <h6><FaTasks className="me-2" /> Pending Tasks</h6>
              <p>5</p>
            </Card>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <Card className="p-3 shadow-sm custom-inner-card">
              <h6><FaClipboardCheck className="me-2" /> Completed Tasks</h6>
              <p>12</p>
            </Card>
          </Col>
        </Row>
      </Card>

      <Row className="justify-content-center mt-4">
        <Col xs={6} md={6} className="mb-2 d-flex justify-content-center">
          <Link to="/task-list">
            <Button variant="info" className="custom-btn w-100">
              <FaTasks className="me-2" /> View Assigned Tasks
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkerDashboard;