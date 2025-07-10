import React from 'react';

function Employers() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Top Employers</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Section 1 - Tech Companies */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Tech Companies</h2>
          <ul className="space-y-2 text-gray-600">
            <li>💻 Google</li>
            <li>🖥️ Microsoft</li>
            <li>📱 Apple</li>
            <li>☁️ Amazon Web Services</li>
            <li>🔍 Meta (Facebook)</li>
          </ul>
        </div>

        {/* Section 2 - Finance & Banking */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Finance & Banking</h2>
          <ul className="space-y-2 text-gray-600">
            <li>🏦 JPMorgan Chase</li>
            <li>📈 Goldman Sachs</li>
            <li>💰 Morgan Stanley</li>
            <li>📊 Bank of America</li>
            <li>📝 Wells Fargo</li>
          </ul>
        </div>

        {/* Section 3 - Healthcare & Pharma */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Healthcare & Pharma</h2>
          <ul className="space-y-2 text-gray-600">
            <li>🏥 Johnson & Johnson</li>
            <li>💊 Pfizer</li>
            <li>🩺 Novartis</li>
            <li>⚕️ Merck</li>
            <li>🧬 Roche</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Employers;
