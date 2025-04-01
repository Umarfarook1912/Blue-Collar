import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus, FaTasks, FaClipboardList, FaCheckCircle, FaSpinner } from "react-icons/fa";
import "./Dashboard.css";

const SupervisorDashboard = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">
        <FaClipboardList className="me-2" /> Supervisor Dashboard
      </h2>

      <Card className="custom-card shadow-lg p-4 mb-4">
        <Card.Body>
          <h5 className="text-white">Welcome, Supervisor!</h5>
          <p className="text-white">Manage tasks efficiently by creating new tasks and tracking assigned work.</p>
        </Card.Body>
      </Card>

      <Card className="custom-card shadow-lg p-4 mt-4 text-center">
        <h5 className="text-white">Task Statistics</h5>
        <Row className="mt-3 text-center">
          <Col xs={12} md={4} className="mb-3">
            <Card className="p-3 shadow-sm custom-inner-card">
              <h6><FaClipboardList className="me-2" /> Total Tasks</h6>
              <p>25</p>
            </Card>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <Card className="p-3 shadow-sm custom-inner-card">
              <h6><FaSpinner className="me-2" /> In Progress</h6>
              <p>10</p>
            </Card>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <Card className="p-3 shadow-sm custom-inner-card">
              <h6><FaCheckCircle className="me-2" /> Completed</h6>
              <p>15</p>
            </Card>
          </Col>
        </Row>
      </Card>

      <Row className="justify-content-end mt-4">
        <Col xs={6} md={5} className="mb-2 d-flex justify-content-end">
          <Link to="/create-task">
            <Button variant="success" className="custom-btn w-100">
              <FaPlus className="me-2" /> Create Task
            </Button>
          </Link>
        </Col>
        <Col xs={6} md={2} className="mb-2 d-flex justify-content-end">
          <Link to="/task-list">
            <Button variant="info" className="custom-btn w-100">
              <FaTasks className="me-2" /> View Tasks
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SupervisorDashboard;
