import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toster from "./Toster";

const API_BASE = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [photo, setPhoto] = useState(null); // ✅ file object
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("roleName", "admin"); // Default role
      formData.append("mobile", mobile);
      if (photo) formData.append("photo", photo);

      await axios.post(`${API_BASE}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registration successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Toster />
      <Card style={{ width: "100%", maxWidth: "450px" }} className="p-4 shadow">
        <h2 className="mb-4 text-center text-success">Create Your Account</h2>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formMobile">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])} // ✅ file object
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>

        <p className="mt-3 text-muted text-center" style={{ fontSize: "0.9rem" }}>
          Already have an account? Log in to start using iNoteBook.
        </p>
      </Card>
    </Container>
  );
};

export default SignUp;
