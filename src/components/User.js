import React from "react";
import { Container, Card } from "react-bootstrap";

const User = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow text-center" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="mb-3 text-success">Welcome to Your Dashboard</h2>
        <p className="lead">You're successfully logged in. Explore your notes, manage your account, and stay productive!</p>
      </Card>
    </Container>
  );
};

export default User;
