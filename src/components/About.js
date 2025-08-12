import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >
      <div>
        <h1 className="mb-4 text-primary">About iNoteBook App</h1>
        <p className="lead">
          iNoteBook is your personal digital notebook—designed to help you capture thoughts, organize ideas, and stay productive.
        </p>
        <p>
          Whether you're jotting down quick reminders or managing detailed notes across projects, iNoteBook keeps everything secure, accessible, and beautifully simple.
        </p>
        <p>
          Built with modern web technologies, it offers seamless performance, intuitive design, and robust features like authentication, role-based access, and real-time updates.
        </p>
        <p><strong>Version:</strong> 1.0.0</p>
        <p className="mt-4 text-muted">
          Crafted with care by developers who believe that great tools should be simple, secure, and empowering.
        </p>
      </div>
    </Container>
  );
};

export default About;
