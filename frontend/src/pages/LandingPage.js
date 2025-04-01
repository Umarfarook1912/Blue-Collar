import React from "react";
import { Container, Button, Row, Col, Card, Accordion, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <Container className="mt-3">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Landing Page</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <div className="hero-section text-center">
        <Container className="py-4">
          <h1 className="display-4 fw-bold">Manage Blue Collar Workforce Efficiently</h1>
          <p className="lead">Supervisors can create tasks, assign workers, and track progress seamlessly.</p>
          <Button as={Link} to="/signup" variant="info" className="m-2 btn-md">Get Started</Button>
        </Container>
      </div>

      <Container className="my-5">
        <Row className="g-4">
          {[
            { title: "Task Management", text: "Assign and track tasks efficiently." },
            { title: "Worker Profiles", text: "Manage worker info and performance." },
            { title: "Analytics & Reports", text: "Monitor work progress in real-time." },
          ].map((feature, index) => (
            <Col md={4} key={index}>
              <Card className="feature-card shadow-lg">
                <Card.Body>
                  <Card.Title className="fw-bold card-text">{feature.title}</Card.Title>
                  <Card.Text className="card-text">{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="stats-section text-center my-5 py-4">
        <Row className="g-4">
          {[
            { label: "Workers Managed", value: "10K+" },
            { label: "Tasks Assigned", value: "50K+" },
            { label: "Companies Served", value: "200+" },
          ].map((stat, index) => (
            <Col md={4} key={index}>
              <h2 className="fw-bold">{stat.value}</h2>
              <p>{stat.label}</p>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="faq-section my-5">
        <h2>Frequently Asked Questions</h2>
        <Accordion>
          {[
            { question: "What is Blue Collar Management?", answer: "A platform to manage and track workforce efficiency." },
            { question: "How can I assign tasks?", answer: "Supervisors create and assign tasks using our dashboard." },
            { question: "Is this platform free?", answer: "We offer free and premium plans." },
          ].map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={index} className="mb-3">
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>

    </>
  );
};

export default LandingPage;
