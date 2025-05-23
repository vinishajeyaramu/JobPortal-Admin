import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const resetRequests = JSON.parse(
      localStorage.getItem("resetRequests") || "[]"
    );
    const validRequest = resetRequests.find((req) => req.token === token);
    setIsValidToken(!!validRequest);
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Get users and reset requests from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const resetRequests = JSON.parse(
        localStorage.getItem("resetRequests") || "[]"
      );

      const resetRequest = resetRequests.find((req) => req.token === token);
      if (!resetRequest) {
        toast.error("Invalid or expired reset token");
        return;
      }

      // Update user's password
      const updatedUsers = users.map((user) => {
        if (user.email === resetRequest.email) {
          return { ...user, password };
        }
        return user;
      });

      // Remove used reset token
      const updatedResetRequests = resetRequests.filter(
        (req) => req.token !== token
      );

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("resetRequests", JSON.stringify(updatedResetRequests));

      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  if (!isValidToken) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-600">Invalid or expired reset token</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;