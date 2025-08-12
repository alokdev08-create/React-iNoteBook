import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import moment from "moment";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      const notesArray = Array.isArray(data)
        ? data
        : Array.isArray(data.notes)
        ? data.notes
        : [];

      setNotes(notesArray);
    } catch (error) {
      setMessage("Failed to load notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ✅ Create or update note
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (title.trim().length < 3 || content.trim().length < 1) {
      setMessage("Title must be at least 3 characters and content cannot be empty.");
      return;
    }

    try {
      const payload = { title: title.trim(), content: content.trim() };

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/notes/updateNotes/${editId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Note updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/notes", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Note created successfully");
        setShowPrompt(true); // ✅ Show modal prompt
      }

      setTimeout(() => setMessage(""), 2000);
      setTitle("");
      setContent("");
      setEditId(null);
      fetchNotes();
    } catch (error) {
      setMessage("Error saving note");
    }
  };

  // ✅ Delete note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/deleteNotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Note deleted");
      setTimeout(() => setMessage(""), 2000);
      fetchNotes();
    } catch (error) {
      setMessage("Error deleting note");
    }
  };

  // ✅ Start editing
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-primary">📝 Your Notes</h2>

      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="noteTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter note title (min 3 characters)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength={3}
                maxLength={100}
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="noteContent" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          {editId ? "Update Note" : "Add Note"}
        </Button>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : notes.length > 0 ? (
        <Row>
          {notes.map((note) => (
            <Col key={note._id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-dark">
                    {note.title}
                  </Card.Title>
                  <Card.Text
                    className="flex-grow-1"
                    style={{
                      whiteSpace: "pre-wrap",
                      overflowY: "auto",
                      maxHeight: "150px",
                    }}
                  >
                    {note.content}
                  </Card.Text>
                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {moment(note.date).format("MMM D, YYYY h:mm A")}
                    </small>
                    <div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(note)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No notes found.</p>
      )}

      {/* ✅ Modal Prompt */}
      <Modal show={showPrompt} onHide={() => setShowPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Note Saved</Modal.Title>
        </Modal.Header>
        <Modal.Body>✅ Your note was saved successfully. Want to add another?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrompt(false)}>
            No, I'm done
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowPrompt(false);
              setTitle("");
              setContent("");
            }}
          >
            Yes, add more
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Notes;
