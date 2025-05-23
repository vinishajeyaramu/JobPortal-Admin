import { createContext, useEffect, useState } from "react";

export const jobpostContext = createContext();

// Initial jobs data if needed
const initialJobs = [
  {
    job_id: 1,
    job_title: "Software Engineer",
    job_experience_level: 2,
    job_technical_skills: ["React", "Node.js", "JavaScript"],
    job_location: "Remote",
    job_type: ["Full-time"],
    job_status: "Active",
    job_close_date: "2025-12-31",
    job_description: "Description here..."
  }
];

const JobPost = ({ children }) => {
  const [jobpost, setJobPost] = useState([]);

  useEffect(() => {
    // Initialize localStorage if empty
    if (!localStorage.getItem("jobs")) {
      localStorage.setItem("jobs", JSON.stringify(initialJobs));
    }

    // Load jobs from localStorage
    try {
      const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      setJobPost(savedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
      setJobPost([]);
    }
  }, []);

  return (
    <jobpostContext.Provider value={{ jobpost, setJobPost }}>
      {children}
    </jobpostContext.Provider>
  );
};

export default JobPost;


