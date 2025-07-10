import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Careertips() {
  // State to manage expanded sections
  const [expanded, setExpanded] = useState({
    resume: false,
    interview: false,
    networking: false,
  });

  // Function to toggle the expansion
  const toggleExpand = (section) => {
    setExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Advance Your Career with Expert Tips</h1>
        <p className="text-lg">From resume building to interview success, get the guidance you need!</p>
        <Link to="/jobs" className="mt-4 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200">
          Explore Job Openings
        </Link>
      </div>

      {/* Career Advice Sections */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 mt-10">
        
        {/* Resume & Cover Letter Tips */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">📄 Resume & Cover Letter</h2>
          <p className="text-gray-600">Learn how to craft a winning resume and cover letter to stand out.</p>
          
          {expanded.resume && (
            <p className="text-gray-500 mt-2">
              Use strong action verbs, tailor your resume to the job, and highlight achievements, not just responsibilities.
            </p>
          )}

          <button 
            onClick={() => toggleExpand('resume')} 
            className="text-blue-500 font-semibold mt-3 block focus:outline-none"
          >
            {expanded.resume ? "Read Less ▲" : "Read More ▼"}
          </button>
        </div>

        {/* Interview Preparation */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">🎙️ Ace Your Interviews</h2>
          <p className="text-gray-600">Master interview techniques and leave a lasting impression.</p>

          {expanded.interview && (
            <p className="text-gray-500 mt-2">
              Practice common questions, research the company, and be confident in sharing your experiences.
            </p>
          )}

          <button 
            onClick={() => toggleExpand('interview')} 
            className="text-blue-500 font-semibold mt-3 block focus:outline-none"
          >
            {expanded.interview ? "Read Less ▲" : "Read More ▼"}
          </button>
        </div>

        {/* Career Growth & Networking */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">🌱 Career Growth & Networking</h2>
          <p className="text-gray-600">Build a strong network and advance your career the smart way.</p>

          {expanded.networking && (
            <p className="text-gray-500 mt-2">
              Attend industry events, connect on LinkedIn, and seek mentorship for career growth.
            </p>
          )}

          <button 
            onClick={() => toggleExpand('networking')} 
            className="text-blue-500 font-semibold mt-3 block focus:outline-none"
          >
            {expanded.networking ? "Read Less ▲" : "Read More ▼"}
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-200 py-12 mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Ready to Take the Next Step?</h2>
        <p className="text-gray-600 mt-2">Sign up today and start your journey towards career success.</p>
        <Link to="/register" className="mt-4 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
          Get Started
        </Link>
      </div>

    </div>
  );
}

export default Careertips;
