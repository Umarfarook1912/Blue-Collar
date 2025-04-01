import React, { useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./CreateTask.css";

const CreateTask = ({ onTaskCreated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const taskToEdit = location.state?.task;

    const {
        register,
        handleSubmit,
        setValue, reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (taskToEdit) {
            setValue("title", taskToEdit.title);
            setValue("description", taskToEdit.description);
            setValue("assignedTo", taskToEdit.assignedTo?.email || "");
        }
    }, [taskToEdit, setValue]);

    const onSubmit = async (data) => {
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
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save task or User not found");
            }

            toast.success(taskToEdit ? "Task Updated Successfully!" : "Task Created Successfully!");
            if (!taskToEdit) {
                reset();
            }


            setTimeout(() => (taskToEdit ? navigate("/task-list") : navigate("/create-task")), 2000);
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <Container className="task-form-container">
            <Card className="task-form-card shadow-lg p-4">
                <h2 className="text-center">{taskToEdit ? "Update Task" : "Create Task"}</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <p className="text-danger">{errors.title.message}</p>}
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <p className="text-danger">{errors.description.message}</p>}
                    </Form.Group>

                    <Form.Group controlId="assignedTo">
                        <Form.Label>Assign To (Email)</Form.Label>
                        <Form.Control
                            type="email"
                            {...register("assignedTo", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email format",
                                },
                            })}
                            onChange={(e) => (e.target.value = e.target.value.toLowerCase())}

                        />
                        {errors.assignedTo && <p className="text-danger">{errors.assignedTo.message}</p>}
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button variant="success" type="submit" className="w-50 mt-3 btn-md">
                            {taskToEdit ? "Update Task" : "Create Task"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default CreateTask;
