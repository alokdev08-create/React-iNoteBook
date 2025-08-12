import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-1">© {new Date().getFullYear()} iNoteBook. All rights reserved.</p>
        <small>
          Built with ❤️ by Alok | <a href="mailto:support@inotebook.com" className="text-warning">Contact Us</a>
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
