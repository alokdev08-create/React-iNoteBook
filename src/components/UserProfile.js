import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Button,
  Modal,
  Form,
  Image
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: "", mobile: "" });
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/auth/fetchUserDetails`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setEditedUser({ name: data.user.name, mobile: data.user.mobile });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);

  // ✅ Handle profile update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedUser.name);
      formData.append("mobile", editedUser.mobile);
      if (newPhoto) formData.append("photo", newPhoto);

      const response = await fetch(`${API_BASE}/auth/updateProfile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      if (result.user) {
        setUser(result.user);
        setShowEditModal(false);
        setNewPhoto(null);
      } else {
        console.error("Update failed:", result.message || result);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // ✅ Handle profile deletion
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete your profile?");
    if (!confirm) return;

    try {
      await fetch(`${API_BASE}/auth/deleteProfile`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  // ✅ Construct image source
  const getProfileImageSrc = (photo) => {
    if (!photo || photo === "default.jpg") {
      return "/default.jpg"; // served from public folder
    }
    return `${API_BASE.replace("/api", "")}/uploads/${photo}`;
  };

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar bg="light" expand="lg" className="justify-content-end px-4" />

      {/* ✅ Profile Details */}
      <Container className="mt-5">
        <h2 className="mb-4">👤 User Profile</h2>
        {user ? (
          <div className="d-flex flex-column align-items-start gap-3">
            <Image
              src={getProfileImageSrc(user.photo)}
              alt="Profile"
              rounded
              style={{ width: "150px", borderRadius: "8px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default.jpg";
              }}
            />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>

            {/* ✅ Icon-based controls */}
            <div className="d-flex gap-3 align-items-center">
              <i
                className="fa-solid fa-pen-to-square text-primary"
                onClick={() => setShowEditModal(true)}
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                title="Edit Profile"
              ></i>
              <i
                className="fa-solid fa-trash text-danger"
                onClick={handleDelete}
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                title="Delete Profile"
              ></i>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </Container>

      {/* ✅ Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={editedUser.mobile}
                onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload New Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setNewPhoto(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;
