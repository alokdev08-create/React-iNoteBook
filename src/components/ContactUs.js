import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Contact = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <h1 className="mb-4 text-info">Contact Us</h1>
        <p className="lead">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello—drop us a message.
        </p>

        <p>
          <strong>Email:</strong> support@inotebook.com  
        </p>
        <p>
          <strong>Phone:</strong> +91 98765 43210
        </p>

        <Form className="mt-4 text-start">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Your message..." />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </div>
        </Form>

        <p className="mt-4 text-muted">
          We typically respond within 24 hours. Your thoughts matter to us.
        </p>
      </div>
    </Container>
  );
};

export default Contact;
