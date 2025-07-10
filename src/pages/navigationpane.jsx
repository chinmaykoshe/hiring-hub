import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user details from localStorage when the component mounts
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");

    if (isLoggedIn) {
      setUser({ role, email, userId });
    } else {
      setUser(null);
    }
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // Clear authentication data
    setUser(null); // Reset state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md flex justify-between items-center">
      {/* Logo / Brand Name */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-wide">Hiring Hub</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/jobs" className="hover:underline">Jobs</Link>
        <Link to="/employers" className="hover:underline">Employers</Link>
        <Link to="/careertips" className="hover:underline">Career Tips</Link>

        {user ? (
          <>
            {user.role === "recruiter" ? (
              <Link to="/recruiter" className="hover:underline">Recruiter Dashboard</Link>
            ) : (
              <Link to="/jobseeker" className="hover:underline">Jobseeker Dashboard</Link>
            )}
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2">
          <span className={`text-2xl ${isOpen ? "text-red-600" : "text-white"}`}>
            {isOpen ? "✖" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 text-white md:hidden p-4 space-y-4 z-10">
          <Link to="/" className="block text-center hover:underline">Home</Link>
          <Link to="/jobs" className="block text-center hover:underline">Jobs</Link>
          <Link to="/employers" className="block text-center hover:underline">Employers</Link>
          <Link to="/careertips" className="block text-center hover:underline">Career Tips</Link>

          {user ? (
            <>
              {user.role === "recruiter" ? (
                <Link to="/recruiter" className="block text-center hover:underline">
                  Recruiter Dashboard
                </Link>
              ) : (
                <Link to="/jobseeker" className="block text-center hover:underline">
                  Jobseeker Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="block text-center hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block text-center hover:underline">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
