const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/jobPortal", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));
  const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    mobno: String, // ✅ Fixed typo
    qualification: String, // ✅ Fixed typo
    experiencesummary: { type: String, default: null }, // ✅ Optional resume link
    password: String, // ⚠ Storing plain text passwords (not recommended)
    role: { type: String, enum: ["recruiter", "jobseeker"], required: true },
  });
  
  const User = mongoose.model("User", UserSchema);
// Job Schema
const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  recruiterEmail: { type: String, required: true }, // ✅ Ensure recruiterEmail is stored
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Job = mongoose.model("Job", JobSchema);

app.post("/register", async (req, res) => {
  const { name, email, mobno, qualification, experiencesummary, password, role} = req.body;

  if (!name || !email || !mobno || !password || !role) {
    return res.status(400).json({ message: "All required fields (name, email, mobno, qualification, password, role) must be provided" });
  }

  if (!["recruiter", "jobseeker"].includes(role)) {
    return res.status(400).json({ message: "Role must be either recruiter or jobseeker" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already in use" });

  const user = new User({
    name,
    email,
    mobno,
    qualification,
    experiencesummary,
    password,
    role,
  });

  await user.save();

  res.json({ message: "User registered successfully" });
});

// Middleware for authentication (password only required for login & register)
const authenticateBasic = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Password check only for login/register
  if (password && user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  req.user = user;
  next();
};

app.post("/jobs", async (req, res) => {
  try {
    console.log("Received job post request:", req.body); // ✅ Log request data

    const { title, description, company, location, recruiterEmail } = req.body;
    
    if (!title || !description || !company || !location || !recruiterEmail) {
      return res.status(400).json({ message: "All fields including recruiterEmail are required" });
    }

    const job = new Job({ title, description, company, location, recruiterEmail });

    await job.save();
    res.json({ message: "Job posted successfully", job });

  } catch (error) {
    console.error("Error posting job:", error); // ✅ Log backend error
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

app.get("/users/:id/applied-jobs", async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from URL

    // Find jobs where the user is an applicant
    const jobs = await Job.find({ applicants: id }).select("_id title company");

    res.json({ appliedJobs: jobs.map((job) => job._id) }); // Send applied job IDs
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Login User
app.post("/login", authenticateBasic, (req, res) => {
  res.json({ 
    message: "Login successful", 
    role: req.user.role, 
    email: req.user.email, 
    userId: req.user._id 
  });
});
app.post("/jobs", async (req, res) => {
  const { title, description, company, location, email } = req.body; // Get email from request body

  if (!title || !description || !company || !location || !email) {
    return res.status(400).json({ message: "All fields (title, description, company, location, email) are required" });
  }

  const job = new Job({
    title,
    description,
    company,
    location,
    recruiterEmail: email, // Store email instead of ID
  });

  await job.save();
  res.json({ message: "Job posted successfully" });
});

app.put("/jobs/:id/apply", authenticateBasic, async (req, res) => {
  try {
    const { id } = req.params; // Job ID from URL
    const user = req.user; // Authenticated user

    if (user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only job seekers can apply for jobs." });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    if (job.applicants.includes(user._id)) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    job.applicants.push(user._id);
    await job.save();

    res.json({ message: "Successfully applied for the job!" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Get Applicants for a Specific Job
app.get("/jobs/:id/applicants", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("applicants", "name email mobno qualification experiencesummary"); // Populate applicants with user details

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job.applicants);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs); // ✅ Send job list
  } catch (error) {
    console.error("Error fetching jobs:", error); // ✅ Log backend error
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
