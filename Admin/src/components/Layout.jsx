import Sidebar from "../components/Sidebar"; // Changed from Home to Sidebar
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
