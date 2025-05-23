import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin from localStorage
    const email = localStorage.getItem('email');
    setIsAdmin(email === 'apply@superlabs.co');

    // Redirect to login if not authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div>
      <div className="flex flex-row bg-blue-gray-200">
        <div className="w-72 gap-10 px-10 shadow-lg bg-slate-100 h-screen flex flex-col">
          <Link to="/" className="text-2xl font-bold py-8">Superlabs Careers</Link>
          <h6 className="py-5 text-md font-bold text-gray-600">Menu</h6>
          
          {/* Common links for all users */}
          <Link 
            to="/" 
            className={`py-2 px-4 rounded-md transition-colors ${
              location.pathname === "/" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/jobpost"
            className={`py-2 px-4 rounded-md transition-colors ${
              location.pathname === "/jobpost" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
          >
            JobPost
          </Link>
          <Link 
            to="/location"
            className={`py-2 px-4 rounded-md transition-colors ${
              location.pathname === "/location" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
          >
            Location
          </Link>
          <Link 
            to="/category"
            className={`py-2 px-4 rounded-md transition-colors ${
              location.pathname === "/category" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
          >
            Categories
          </Link>

          {/* Admin-only links */}
          {isAdmin && (
            <>
              <Link 
                to="/users"
                className={`py-2 px-4 rounded-md transition-colors ${
                  location.pathname === "/users" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                }`}
              >
                Users
              </Link>
              <Link 
                to="/selectedcandidates"
                className={`py-2 px-4 rounded-md transition-colors ${
                  location.pathname === "/selectedcandidates" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                }`}
              >
                Selected Candidates
              </Link>
            </>
          )}

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="mt-auto mb-8 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
        <main className="flex-1 p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
