import { useEffect, useState } from "react";

function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAppliedJobs = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:5000/users/${userId}/applied-jobs`, {
          headers: { },
        });

        if (!res.ok) throw new Error("Failed to fetch applied jobs");

        const data = await res.json();
        setAppliedJobs(new Set(data.appliedJobs)); 
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, [userId]);

  const handleApply = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${jobId}/apply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send user email for authentication
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to apply");
  
      alert(data.message);
      setAppliedJobs((prev) => new Set([...prev, jobId])); // Update UI after applying
    } catch (error) {
      alert(error.message);
    }
  };
  

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Job Seeker Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                {appliedJobs.has(job._id) ? (
                  <p className="text-green-600 font-semibold">Applied Already!</p>
                ) : (
                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JobSeekerDashboard;
