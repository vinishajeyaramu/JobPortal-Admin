import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  const checkAuth = () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    
    if (!email || !token) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuth();
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
