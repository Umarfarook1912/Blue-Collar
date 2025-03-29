import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import CreateTask from "./pages/CreateTask";
import TaskList from "./pages/TaskList";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";

const ProtectedRoute = ({ element, requiredRole }) => {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/login" />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/" />;

  return element;
};

const App = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <Router>
      <div className="app-container">
        <ToastContainer />
        <NavbarComponent />

        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/supervisor-dashboard" element={<ProtectedRoute element={<SupervisorDashboard />} requiredRole="supervisor" />} />
            <Route path="/worker-dashboard" element={<ProtectedRoute element={<WorkerDashboard />} requiredRole="worker" />} />
            <Route path="/create-task" element={<ProtectedRoute element={<CreateTask onTaskCreated={() => setRefresh(!refresh)} />} requiredRole="supervisor" />} />
            <Route path="/task-list" element={<ProtectedRoute element={<TaskList onTaskCreated={() => setRefresh(!refresh)} />} />} />
          </Routes>
        </main>

        <FooterComponent />
      </div>
    </Router>
  );
};

export default App;
