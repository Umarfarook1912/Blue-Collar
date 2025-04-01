
import React from "react";
import { Container } from "react-bootstrap";
import "./NavbarFooter.css";

const FooterComponent = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <p>
          &copy; {new Date().getFullYear()} Blue Collar Management. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default FooterComponent;
