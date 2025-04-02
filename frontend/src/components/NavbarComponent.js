import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          Blue Collar Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            {!loading && ( 
              user ? (
                <>
                  <Nav.Link className="nav-link-custom">Welcome!! {user.name}</Nav.Link>
                  <Nav.Link as={Link} to="/task-list" className="nav-link-custom">
                    Task List
                  </Nav.Link>
                  <Button variant="danger" onClick={handleLogout} className="ms-3">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup" className="nav-link-custom">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className="nav-link-custom">
                    Login
                  </Nav.Link>
                </>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
