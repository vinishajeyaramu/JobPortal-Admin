import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  // Helper function to safely get auth info from localStorage
  const getAuthFromLocalStorage = () => {
    try {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      return { email, token };
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return { email: null, token: null };
    }
  };

  const checkAuth = () => {
    const { email, token } = getAuthFromLocalStorage();
    
    if (!email || !token) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuth();
    // You could also add a listener here for storage event if needed
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-72">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;