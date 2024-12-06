import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2c3e50",
        color: "#fff",
        padding: "20px 0",
      }}
    >
      <Container>
        <Row>
          <Col md={6} className="text-center py-2">
            Copyright &copy; {new Date().getFullYear()}
          </Col>
          <Col md={6} className="text-center py-2">
            <i className="fas fa-envelope mr-2"></i> Contact: 123@gmail.com
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
