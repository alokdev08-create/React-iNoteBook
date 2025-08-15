import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Notes from './components/Notes';
import UserProfile from './components/UserProfile'; // ✅ Import profile component
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          {/* ✅ NavBar will show profile dropdown if user is logged in */}
          <NavBar />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<UserProfile />} /> {/* ✅ Profile route */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
