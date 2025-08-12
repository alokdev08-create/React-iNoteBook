import React from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >
      <div>
        <h1 className="mb-4 text-success">Welcome to iNoteBook</h1>
        <p className="lead">
          Your thoughts deserve a home. iNoteBook helps you capture, organize, and revisit your ideas anytime, anywhere.
        </p>
        <p>
          Whether you're planning your next big project or just jotting down daily reflections, this app is built to keep your notes secure, searchable, and beautifully simple.
        </p>
        <p className="mt-4 text-muted">
          Start writing. Stay organized. Think freely.
        </p>
      </div>
    </Container>
  );
};

export default Home;
