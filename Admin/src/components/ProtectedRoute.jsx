import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    // Check token expiration if stored
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
      // Clear expired auth data
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("tokenExpiration");
    }
  }, []);

  // Verify both token and email exist
  if (!token || !email) {
    return <Navigate to="/login" />;
  }

  // Verify admin email if needed
  if (email !== "apply@superlabs.co") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
