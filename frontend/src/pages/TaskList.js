import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskList = ({ refresh }) => {
    const [tasks, setTasks] = useState([]);
    const [userRole, setUserRole] = useState("");
    const [editedTasks, setEditedTasks] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")); 
        if (user && user.role) {
            setUserRole(user.role);
        }
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/tasks", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setTasks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refresh]);

    const handleEdit = (task) => {
        navigate("/create-task", { state: { task } }); // Pass task data
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to delete task");

            toast.success("Task Deleted Successfully!");

            // Fetch tasks after toast is shown
            setTimeout(() => fetchTasks(), 1000); // Reduce timeout for better UX
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleStatusChange = (taskId, newStatus) => {
        setEditedTasks((prev) => ({
            ...prev,
            [taskId]: newStatus, // Store the updated status for each task
        }));
    };
    const handleSaveStatus = async (taskId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ status: editedTasks[taskId] }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            // Show toast message
            toast.success("Status updated successfully!", {
                position: "top-right",
                autoClose: 2000,
            });

            // Delay fetching tasks slightly to improve UX
            setTimeout(() => fetchTasks(), 3000);

            // Reset the edited task status
            setEditedTasks((prev) => {
                const updatedTasks = { ...prev };
                delete updatedTasks[taskId];
                return updatedTasks;
            });
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

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
                                    <Card.Text><strong>Description:</strong> {task.description}</Card.Text>
                                    <Card.Text><strong>Assigned To:</strong> {task.assignedTo?.email || "Unknown"}</Card.Text>
                                    <Card.Text><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</Card.Text>
                                    <Card.Text>
                                        <strong>Status:</strong>
                                        <Form.Select
                                            value={editedTasks[task._id] || task.status}
                                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                            className="mt-2"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </Form.Select>
                                    </Card.Text>

                                    {editedTasks[task._id] && editedTasks[task._id] !== task.status && (
                                        <Button
                                            variant="success"
                                            className="mt-2"
                                            onClick={() => handleSaveStatus(task._id)}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    {userRole === "supervisor" && (
                                        <>
                                            <Button variant="warning" className="me-2" onClick={() => handleEdit(task)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(task._id)}>
                                                Delete
                                            </Button>
                                        </>
                                    )}
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
