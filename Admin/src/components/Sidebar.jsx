import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MdPerson, MdHome } from "react-icons/md"; // Add MdHome icon

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const name = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="h-full bg-white shadow-lg fixed">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-bold text-blue-600">
          Superlabs Careers
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav className="mt-5 px-5">
        {/* Add Client Home link */}
        <a
          href="http://localhost:5175/home"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
            location.pathname === "/home"
              ? "bg-red-100 text-red-500"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <MdHome className="text-xl" />
          <span>Career Portal</span>
        </a>
        <Link
          to={"/"}
          className={`block m-2 py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100 transition ${
            location.pathname === "/" ? "bg-blue-500 hover:bg-blue-700 text-white" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to={"/jobpost"}
          className={`block m-2 py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100 transition ${
            location.pathname === "/jobpost" ? "bg-blue-500 hover:bg-blue-700 text-white" : ""
          }`}
        >
          Job Post
        </Link>
        <Link
          to={"/candidates"}
          className={`block m-2 py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100 transition ${
            location.pathname === "/candidates" ? "bg-blue-500 hover:bg-blue-700 text-white" : ""
          }`}
        >
          Applied Candidates
        </Link>
        <p className="bg-gray-300 h-[1px]"></p>
        <br />
        <Link
          to={"/location"}
          className={`block m-2 py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100 transition ${
            location.pathname === "/location" ? "bg-blue-500 hover:bg-blue-700 text-white" : ""
          }`}
        >
          Add Location
        </Link>
        <Link
          to={"/category"}
          className={`block m-2 py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100 transition ${
            location.pathname === "/category" ? "bg-blue-500 hover:bg-blue-700 text-white" : ""
          }`}
        >
          Add Category
        </Link>
        {name === "apply@superlabs.co" && (
          <>
            <p className="bg-gray-300 h-[1px]"></p>
            <br />
            <Link
              to={"/users"}
              className={`block m-2 py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100 transition ${
                location.pathname === "/users" ? "bg-blue-500 hover:bg-blue-700 text-white" : ""
              }`}
            >
              Add Users
            </Link>
          </>
        )}
      </nav>
      <div className="p-5 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
