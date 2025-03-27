import React from "react";
import { Container } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <Container>
        <p>&copy; {new Date().getFullYear()} Blue Collar Management. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default FooterComponent;
