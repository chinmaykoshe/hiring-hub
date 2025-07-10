import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newJob, setNewJob] = useState({ title: "", description: "", company: "", location: "" });
  const [showForm, setShowForm] = useState(false); // Toggle state

  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/jobs");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      setError("Failed to fetch jobs");
    }
  };

  const handleViewApplicants = async (jobId) => {
    if (selectedJob === jobId) {
      // If already selected, hide applicants
      setSelectedJob(null);
      setApplicants([]);
      return;
    }

    setSelectedJob(jobId);
    try {
      const res = await fetch(`http://localhost:5000/jobs/${jobId}/applicants`);
      const data = await res.json();
      setApplicants(data);
    } catch {
      setError("Failed to fetch applicants");
    }
  };

  const handlePostJob = async () => {
    if (!email) {
      console.log("Recruiter email is missing. Please log in.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newJob, recruiterEmail: email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      fetchJobs();
      setNewJob({ title: "", description: "", company: "", location: "" });
      setShowForm(false); // Hide form after posting
    } catch (err) {
      console.log("Failed to post job: " + err.message);
    }
  };

  return (
    <div className="pb-50 bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold mb-6">Recruiter Dashboard</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className={`px-4 py-2 rounded-lg text-white ${showForm ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {showForm ? "Cancel" : "Post a Job"}
      </button>

      {/* Job Posting Form (Visible when showForm is true) */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h3 className="text-xl font-semibold mb-4">Post a Job</h3>
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <textarea
            placeholder="Description"
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handlePostJob}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Submit Job
          </button>
        </div>
      )}

      {/* Job Listings */}
      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <ul className="space-y-4 mt-6">
          {jobs.map((job) => (
            <li key={job._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-xl">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
                <div className="space-x-4">
                  {/* Show "View Applicants" only if the current recruiter posted the job */}
                  {job.recruiterEmail === email && (
                    <button
                      onClick={() => handleViewApplicants(job._id)}
                      className={`text-white px-4 py-2 rounded-lg ${selectedJob === job._id ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      {selectedJob === job._id ? "Cancel" : "View Applicants"}
                    </button>
                  )}
                </div>
              </div>

              {selectedJob === job._id && (
                <div className="mt-4 p-4 border-t">
                  <h4 className="font-semibold text-lg mb-2">Applicants:</h4>
                  {applicants.length > 0 ? (
                    <div className="grid lg-grid-cols-2 gap-4">
                      {applicants.map((applicant) => (
                        <div key={applicant._id} className="bg-gray-100 p-4 rounded-lg">
                          <p><strong>Name:</strong> {applicant.name}</p>
                          <p><strong>Email:</strong> {applicant.email}</p>
                          <p><strong>Mob.No.:</strong> {applicant.mobno}</p>
                          <p><strong>Qualification:</strong> {applicant.qualification}</p>
                          <p><strong>Experience:</strong> {applicant.experiencesummary}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No applicants yet.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecruiterDashboard;
