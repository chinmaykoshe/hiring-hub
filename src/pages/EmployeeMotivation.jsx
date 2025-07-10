import { Link } from "react-router-dom";
import { useState } from "react";

function EmployeeMotivation() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-center p-6 space-y-6 bg-gradient-to-b from-blue-100 to-white">
      {/* Hero Section with background gradient and hover animation */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-lg shadow-lg text-white transform transition duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold mb-4">Boost Your Career Motivation</h1>
        <p className="text-lg mb-4">Stay inspired and achieve your professional goals.</p>
        <Link to="/jobs">
          <button className="px-6 py-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110">
            Explore Job Openings
          </button>
        </Link>
      </section>

      {/* Why Use This Website Section with icon and hover effects */}
      <section className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">
          <i className="fas fa-rocket mr-2"></i>Why Use This Website?
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Find your dream job with ease</li>
          <li>Recruit top talent for your company</li>
          <li>Access career growth resources</li>
          <li>Stay updated with the latest industry trends</li>
        </ul>
      </section>

      {/* Key Career Motivation Tips Section with icons */}
      <section className="p-6 bg-gray-50 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">
          <i className="fas fa-lightbulb mr-2"></i>Key Career Motivation Tips
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Set clear and achievable goals</li>
          <li>Maintain a positive mindset</li>
          <li>Seek continuous learning opportunities</li>
          <li>Balance work and personal life</li>
        </ul>
      </section>

      {/* Additional Career Tips Section with smooth expansion */}
      <section className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">
          <i className="fas fa-briefcase mr-2"></i>Additional Career Tips
        </h2>
        <div>
          <p className="text-gray-700 mb-4">
            Career success is built on small, consistent steps towards your goals. Building a network, constantly learning, and staying adaptable are key factors for long-term success.
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-semibold transition duration-300"
          >
            {expanded ? "Read Less ▲" : "Read More ▼"}
          </button>
          {expanded && (
            <div className="mt-4 text-gray-700 transition-all duration-500 opacity-100">
              <p>
                Your career journey will have ups and downs, but staying resilient and focusing on your personal growth will help you overcome challenges. Don't forget to celebrate your small wins along the way!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Get Started Section with a background image */}
      <section className="p-6 bg-blue-100 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          <i className="fas fa-arrow-right mr-2"></i>Get Started Today
        </h2>
        <div className="mt-4 space-x-4">
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105">
              Register
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default EmployeeMotivation;
