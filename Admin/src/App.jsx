import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location";
import Users from "./pages/Users";
import Category from "./pages/Category";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import JobPost from "./pages/JobPost";
import NoPage from "./components/NoPage";
import Candidates from "./pages/Candidates";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Create ThemeContext
export const ThemeContext = createContext();

const initialJobs = [
  {
    job_id: 1,
    job_title: "Senior Software Engineer",
    job_experience_level: 5,
    job_technical_skills: ["React", "Node.js", "AWS", "Python", "MongoDB"],
    job_location: "Remote",
    job_type: ["Full-time"],
    job_status: "Active",
    job_close_date: "2025-12-31",
    job_category: "Engineering",
  },
  {
    job_id: 2,
    job_title: "UI/UX Designer",
    job_experience_level: 3,
    job_technical_skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    job_location: "On-site",
    job_type: ["Full-time"],
    job_status: "Active",
    job_close_date: "2025-06-30",
    job_category: "Design",
  },
    {
      job_id: 3,
      job_title: "DevOps Engineer",
      job_experience_level: 4,
      job_technical_skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Linux"],
      job_location: "Hybrid",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-08-15",
      job_category: "Engineering",
    },
    {
      job_id: 4,
      job_title: "Product Manager",
      job_experience_level: 6,
      job_technical_skills: ["Agile", "JIRA", "Product Strategy", "Analytics"],
      job_location: "Remote",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-07-31",
      job_category: "Management",
    },
    {
      job_id: 5,
      job_title: "Data Scientist",
      job_experience_level: 3,
      job_technical_skills: ["Python", "R", "Machine Learning", "SQL", "TensorFlow"],
      job_location: "On-site",
      job_type: ["Full-time", "Part-time"],
      job_status: "Active",
      job_close_date: "2025-09-30",
      job_category: "Data Science",
    },
    {
      job_id: 6,
      job_title: "Frontend Developer",
      job_experience_level: 2,
      job_technical_skills: ["React", "Vue.js", "JavaScript", "CSS", "HTML"],
      job_location: "Remote",
      job_type: ["Contract"],
      job_status: "Active",
      job_close_date: "2025-05-15",
      job_category: "Engineering",
    },
    {
      job_id: 7,
      job_title: "QA Engineer",
      job_experience_level: 3,
      job_technical_skills: ["Selenium", "TestNG", "Cypress", "API Testing"],
      job_location: "Hybrid",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-10-31",
      job_category: "Quality Assurance",
    },
    {
      job_id: 8,
      job_title: "Technical Writer",
      job_experience_level: 2,
      job_technical_skills: ["Documentation", "Markdown", "API Documentation"],
      job_location: "Remote",
      job_type: ["Part-time", "Contract"],
      job_status: "Active",
      job_close_date: "2025-06-15",
      job_category: "Content",
    },
    {
      job_id: 9,
      job_title: "Mobile App Developer",
      job_experience_level: 4,
      job_technical_skills: ["React Native", "Flutter", "iOS", "Android"],
      job_location: "On-site",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-11-30",
      job_category: "Engineering",
    },
    {
      job_id: 10,
      job_title: "Cloud Architect",
      job_experience_level: 7,
      job_technical_skills: ["AWS", "Azure", "GCP", "Terraform", "CloudFormation"],
      job_location: "Remote",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-08-31",
      job_category: "Engineering",
    },
    {
      job_id: 11,
      job_title: "HR Manager",
      job_experience_level: 5,
      job_technical_skills: ["Recruitment", "Employee Relations", "HR Policies"],
      job_location: "On-site",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-07-15",
      job_category: "Human Resources",
    },
    {
      job_id: 12,
      job_title: "Blockchain Developer",
      job_experience_level: 3,
      job_technical_skills: ["Solidity", "Web3.js", "Smart Contracts", "Ethereum"],
      job_location: "Remote",
      job_type: ["Contract"],
      job_status: "Active",
      job_close_date: "2025-09-15",
      job_category: "Engineering",
    },
    {
      job_id: 13,
      job_title: "Marketing Manager",
      job_experience_level: 4,
      job_technical_skills: ["Digital Marketing", "SEO", "Content Strategy"],
      job_location: "Hybrid",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-06-30",
      job_category: "Marketing",
    },
    {
      job_id: 14,
      job_title: "System Administrator",
      job_experience_level: 5,
      job_technical_skills: ["Linux", "Windows Server", "Networking", "Security"],
      job_location: "On-site",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-10-15",
      job_category: "IT Operations",
    },
    {
      job_id: 15,
      job_title: "Business Analyst",
      job_experience_level: 3,
      job_technical_skills: ["SQL", "Data Analysis", "Requirements Gathering"],
      job_location: "Remote",
      job_type: ["Full-time", "Part-time"],
      job_status: "Active",
      job_close_date: "2025-07-31",
      job_category: "Business",
    },
    {
      job_id: 16,
      job_title: "Database Administrator",
      job_experience_level: 4,
      job_technical_skills: ["MySQL", "PostgreSQL", "MongoDB", "Database Design"],
      job_location: "Hybrid",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-08-31",
      job_category: "Engineering",
    },
    {
      job_id: 17,
      job_title: "Project Manager",
      job_experience_level: 6,
      job_technical_skills: ["Agile", "Scrum", "Project Planning", "Risk Management"],
      job_location: "On-site",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-11-15",
      job_category: "Management",
    },
    {
      job_id: 18,
      job_title: "Security Engineer",
      job_experience_level: 5,
      job_technical_skills: ["Penetration Testing", "Security Auditing", "SIEM"],
      job_location: "Remote",
      job_type: ["Full-time", "Contract"],
      job_status: "Active",
      job_close_date: "2025-09-30",
      job_category: "Security",
    },
    {
      job_id: 19,
      job_title: "ML Engineer",
      job_experience_level: 4,
      job_technical_skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
      job_location: "Hybrid",
      job_type: ["Full-time"],
      job_status: "Active",
      job_close_date: "2025-12-15",
      job_category: "Data Science",
    },
    {
      job_id: 20,
      job_title: "Full Stack Developer",
      job_experience_level: 3,
      job_technical_skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
      job_location: "Remote",
      job_type: ["Full-time", "Contract"],
      job_status: "Active",
      job_close_date: "2025-10-31",
      job_category: "Engineering",
    }
  ];

const App = () => {
  const [job, setJob] = useState(() => {
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("jobs");
      return savedJobs ? JSON.parse(savedJobs) : initialJobs;
    }
    return initialJobs;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jobs", JSON.stringify(job));
    }
  }, [job]);

  const name = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const routes = (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="jobpost" element={<JobPost />} />
          <Route path="location" element={<Location />} />
          <Route path="category" element={<Category />} />
          <Route path="candidates" element={<Candidates />} />
          {name === "apply@superlabs.co" && <Route path="users" element={<Users />} />}
        </Route>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );

  return (
    <MantineProvider>
      <div className="font-Josefin">
        <ThemeContext.Provider value={{ job, setJob }}>
          <BrowserRouter>{routes}</BrowserRouter>
        </ThemeContext.Provider>
      </div>
    </MantineProvider>
  );
};

export default App;