import React, { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";

const TaskList = ({ refresh }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token"); // Assuming you store token in localStorage

            const response = await fetch("http://localhost:5000/api/tasks", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include token
                }
            });

            const data = await response.json();
            console.log("Fetched tasks:", data); // ✅ Debugging output

            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error("Error: Expected an array but got", data);
                setTasks([]); // Prevent crash
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]); // Ensure tasks is always an array
        }
    };



    useEffect(() => {
        fetchTasks();
    }, [refresh]); // Refresh task list when 'refresh' changes

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Task List</h2>
            {tasks.length > 0 ? (
                <Accordion>
                    {tasks.map((task, index) => (
                        <Accordion.Item eventKey={index.toString()} key={task._id}>
                            <Accordion.Header>{task.title}</Accordion.Header>
                            <Accordion.Body>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{task.title}</Card.Title>
                                        <Card.Text><strong>Description:</strong> {task.description}</Card.Text>
                                        <Card.Text><strong>Status:</strong> {task.status}</Card.Text>
                                        <Card.Text><strong>Assigned To:</strong> {task.assignedTo}</Card.Text>
                                        <Card.Text><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );

};

export default TaskList;
