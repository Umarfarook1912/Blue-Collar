import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", data);

      toast.success("Signup Successful! Redirecting to login...", { autoClose: 2000 });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!", { autoClose: 3000 });
    }
  };

  return (
    <Container className="mt-5 p-4 shadow-lg rounded bg-white" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Register</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            onChange={(e) => (e.target.value = e.target.value.toLowerCase())}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required", minLength: { value: 5, message: "Minimum 5 characters" } })}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" {...register("role")}>
            <option value="supervisor">Supervisor</option>
            <option value="worker">Worker</option>
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-center">
        <Button variant="success" type="submit" className="mt-3 w-25">
          Sign Up
        </Button>
        </div>
      </Form>

      <p className="text-center mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </Container>
  );
};

export default SignUp;
