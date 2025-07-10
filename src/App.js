import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployeeMotivation from "./pages/EmployeeMotivation";
import Navbar from "./pages/navigationpane";
import Footer from "./pages/Footer";
import Careertips from "./pages/Careertips";
import Jobs from "./pages/Jobs";
import Employers from "./pages/Employers";
import 'font-awesome/css/font-awesome.min.css';
import Login from "./pages/login";

function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");

  // Load user data from localStorage on mount
  useEffect(() => {
    if (isLoggedIn && role && email && userId) {
      setUser({ isLoggedIn, role, email, userId });
    }
  }, []);

  // Debugging user state updates
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeMotivation />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/careertips" element={<Careertips />} />
        <Route path="/employers" element={<Employers />} />
        <Route
          path="/recruiter"
          element={isLoggedIn && role === "recruiter" ? <RecruiterDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/jobseeker"
          element={isLoggedIn && role === "jobseeker" ? <JobSeekerDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
