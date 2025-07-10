import React from 'react';

function Jobs() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Job Listings</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Section 1 - IT & Software Jobs */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">IT & Software Jobs</h2>
          <ul className="space-y-2 text-gray-600">
            <li>💻 Frontend Developer</li>
            <li>🖥️ Backend Developer</li>
            <li>📱 Mobile App Developer</li>
            <li>☁️ Cloud Engineer</li>
            <li>🔍 Data Analyst</li>
          </ul>
        </div>

        {/* Section 2 - Marketing & Sales Jobs */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Marketing & Sales Jobs</h2>
          <ul className="space-y-2 text-gray-600">
            <li>📢 Digital Marketing Specialist</li>
            <li>🛍️ E-commerce Manager</li>
            <li>📊 Sales Executive</li>
            <li>🤝 Business Development Manager</li>
            <li>✍️ Content Strategist</li>
          </ul>
        </div>

        {/* Section 3 - Finance & Management Jobs */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Finance & Management Jobs</h2>
          <ul className="space-y-2 text-gray-600">
            <li>📈 Financial Analyst</li>
            <li>📑 Accountant</li>
            <li>🏦 Investment Banker</li>
            <li>📊 HR Manager</li>
            <li>📝 Project Manager</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
