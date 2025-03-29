import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify({ email: user.email, role: user.role }));

      toast.success("Login Successful! Redirecting...", { autoClose: 2000 });

      setTimeout(() => {
        navigate(user.role === "supervisor" ? "/supervisor-dashboard" : "/worker-dashboard");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!", { autoClose: 3000 });
    }
  };

  return (
    <Container className="mt-5 p-4 shadow-lg rounded bg-white" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </Form.Group>
        <div className="d-flex justify-content-center">
        <Button variant="success" type="submit" className="mt-3 w-25 ">
          Login
        </Button>
        </div>
      </Form>

      <p className="text-center mt-3">
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </Container>
  );
};

export default Login;
