import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white p-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Branding */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Hiring Hub</h2>
          <p className="text-sm">Connecting talent with opportunity.</p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/jobs" className="hover:underline">Jobs</Link>
          <Link to="/employers" className="hover:underline">Employers</Link>
          <Link to="/careertips" className="hover:underline">Career Tips</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook text-xl hover:text-gray-300"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter text-xl hover:text-gray-300"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin text-xl hover:text-gray-300"></i>
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-sm text-gray-200">
        <p>&copy; {new Date().getFullYear()} Hiring Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
