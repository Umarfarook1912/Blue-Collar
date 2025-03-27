import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTask = ({ onTaskCreated }) => {
    const [formData, setFormData] = useState({ title: "", description: "", assignedTo: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("User not authenticated. Please log in.", { position: "top-right" });
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Send the token correctly
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create task");
            }

            toast.success("Task Created Successfully!", { position: "top-right", autoClose: 2000 });

            setFormData({ title: "", description: "", assignedTo: "" });

        } catch (error) {
            toast.error(`Error: ${error.message}`, { position: "top-right" });
        }
    };


    return (
        <Container className="mt-5">
            <h2>Create Task</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="assignedTo">
                    <Form.Label>Assign To (Email)</Form.Label>
                    <Form.Control type="email" name="assignedTo" value={formData.assignedTo} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">Create Task</Button>
            </Form>

            <ToastContainer />
        </Container>
    );
};

export default CreateTask;
