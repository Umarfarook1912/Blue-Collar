import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const CreateTask = ({ onTaskCreated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const taskToEdit = location.state?.task; 

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
    });

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
                assignedTo: taskToEdit.assignedTo?.email || "",
            });
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("User not authenticated. Please log in.");
            return;
        }

        try {
            const url = taskToEdit
                ? `http://localhost:5000/api/tasks/${taskToEdit._id}`
                : "http://localhost:5000/api/tasks";

            const method = taskToEdit ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to save task");
            }

            toast.success(taskToEdit ? "Task Updated Successfully!" : "Task Created Successfully!");

            setFormData({ title: "", description: "", assignedTo: "" });

            setTimeout(() => taskToEdit? navigate("/task-list"): navigate("/create-task"), 2000); 
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <Container className="mt-5">
            <h2>{taskToEdit ? "Update Task" : "Create Task"}</h2>
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

                <Button variant="primary" type="submit" className="mt-3">
                    {taskToEdit ? "Update Task" : "Create Task"}
                </Button>
            </Form>

        </Container>
    );
};

export default CreateTask;
