import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const TaskList = ({ refresh }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5000/api/tasks", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log("Fetched tasks:", data);

            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error("Error: Expected an array but got", data);
                setTasks([]);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refresh]);

    return (
        <Container className="mt-4">
            <h2 className="mb-3">Task List</h2>
            {tasks.length > 0 ? (
                <Row>
                    {tasks.map((task) => (
                        <Col key={task._id} xs={12} md={6} lg={4} className="mb-3">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Description:</strong> {task.description}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Status:</strong> {task.status}
                                    </Card.Text>
                                    <Card.Text>
                                    <strong>Assigned To:</strong> {task.assignedTo?.email || "Unknown"}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No tasks available.</p>
            )}
        </Container>
    );
};

export default TaskList;
