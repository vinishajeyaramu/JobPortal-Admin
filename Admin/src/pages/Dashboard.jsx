import { useContext, useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { ThemeContext } from "../App";

// Initial static candidates data (if needed)
const initialCandidates = [
  { id: 1, name: "John Doe", status: "Applied" },
  { id: 2, name: "Jane Smith", status: "Interviewing" }
];

export default function Dashboard() {
  const { jobs: contextJobs } = useContext(ThemeContext);
  const [jobs, setJobs] = useState(contextJobs || []);
  const name = localStorage.getItem("username");
  const candidates = JSON.parse(localStorage.getItem('candidates')) || initialCandidates;

  // Load jobs from localStorage
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    setJobs(savedJobs);
  }, []);

  // Calculate job statistics
  const totalJobs = jobs?.length || 0;
  const activeJobs = jobs?.filter(job => job.job_status === "Active").length || 0;
  const inactiveJobs = jobs?.filter(job => job.job_status === "Inactive").length || 0;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="absolute top-7 right-7 bg-blue-100 p-2 rounded-lg flex gap-2">
          <FaUserAlt className="text-gray-700" />
          {name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Jobs Posted </h3>
          <p className="text-2xl">{totalJobs}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Candidates</h3>
          <p className="text-2xl">{candidates?.length || 0}</p>
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

      {/* Charts Section */}
      
    </div>
  );
}
