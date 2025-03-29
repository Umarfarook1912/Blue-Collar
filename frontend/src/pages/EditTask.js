import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const EditTask = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state || {};

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        status: ""
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                assignedTo: task.assignedTo?.email || "",
                status: task.status || "Pending"
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            toast.success("Task updated successfully!", { position: "top-right", autoClose: 2000 });

            navigate("/tasks");

        } catch (error) {
            toast.error(`Error: ${error.message}`, { position: "top-right" });
        }
    };

    return (
        <Container className="mt-5">
            <h2>Edit Task</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="status" value={formData.status} onChange={handleChange} required>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="success" type="submit" className="mt-3">Update Task</Button>
            </Form>

            <ToastContainer />
        </Container>
    );
};

export default EditTask;
