import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Example static jobs data (can be replaced with your own)
const staticJobs = [
  { id: 1, title: 'Frontend Developer', company: 'Company A' },
  { id: 2, title: 'Backend Developer', company: 'Company B' },
  { id: 3, title: 'Fullstack Developer', company: 'Company C' },
];

export default function LoginPage() {
  const navigate = useNavigate();

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Jobs state: Load from localStorage or fallback to staticJobs
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('jobs');
      return saved ? JSON.parse(saved) : staticJobs;
    } catch {
      return staticJobs;
    }
  });

  // Persist jobs to localStorage whenever jobs state changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email);

      // NOTE: Password stored as base64 encoded string (NOT SECURE for production)
      if (user && btoa(password) === user.password) {
        // Save user info and dummy token
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);

        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: 10, width: '100%' }}>
          Login
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <h3>Available Jobs</h3>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <strong>{job.title}</strong> at {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
}
