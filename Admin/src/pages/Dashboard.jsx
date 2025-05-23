import { useContext, useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { ThemeContext } from "../App";

// Static fallback candidates
const initialCandidates = [
  { id: 1, name: "John Doe", status: "Applied" },
  { id: 2, name: "Jane Smith", status: "Interviewing" }
];

export default function Dashboard() {
  const { jobs: contextJobs } = useContext(ThemeContext);
  const [jobs, setJobs] = useState(contextJobs || []);
  
  // Username from localStorage
  const name = localStorage.getItem("username") || "Guest";

  // Candidates loaded from localStorage or fallback to initial
  const [candidates, setCandidates] = useState(() => {
    try {
      const stored = localStorage.getItem('candidates');
      return stored ? JSON.parse(stored) : initialCandidates;
    } catch {
      return initialCandidates;
    }
  });

  // Load jobs from localStorage on mount (prefer localStorage to keep latest data)
  useEffect(() => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      if (savedJobs.length) setJobs(savedJobs);
    } catch (error) {
      console.error("Error reading jobs from localStorage", error);
    }
  }, []);

  // Stats calculations
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => job.job_status === "Active").length;
  const inactiveJobs = jobs.filter(job => job.job_status === "Inactive").length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="absolute top-7 right-7 bg-blue-100 p-2 rounded-lg flex gap-2 items-center">
          <FaUserAlt className="text-gray-700" />
          {name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Jobs Posted</h3>
          <p className="text-2xl">{totalJobs}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Candidates</h3>
          <p className="text-2xl">{candidates.length}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Jobs</h3>
          <p className="text-2xl">{activeJobs}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Inactive Jobs</h3>
          <p className="text-2xl">{inactiveJobs}</p>
        </div>
      </div>

      {/* Charts or other sections can go here */}

    </div>
  );
}
