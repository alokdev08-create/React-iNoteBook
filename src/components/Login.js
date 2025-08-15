import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toster from "./Toster";

const API_BASE = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  console.log("API_BASE:", API_BASE); // ✅ Debugging API base URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      toast.success("Login successful");
      setTimeout(() => navigate("/notes"), 1000);
    } catch (error) {
      const message = error.response?.data?.error || "Login failed";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Toster />
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <h2 className="mb-4 text-center text-primary">Login to iNoteBook</h2>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>

        <p className="mt-3 text-muted text-center" style={{ fontSize: "0.9rem" }}>
          Forgot your password? Contact support@inotebook.com
        </p>
      </Card>
    </Container>
  );
};

export default Login;
