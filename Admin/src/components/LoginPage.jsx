import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

// Initial static admin user
const ADMIN_USER = {
  email: "apply@superlabs.co",
  password: "supersecret",
  username: "admin"
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!values.email || !values.password) {
      setError("Email and password are required");
      return;
    }

    // Check credentials against static admin user
    if (values.email === ADMIN_USER.email && values.password === ADMIN_USER.password) {
      // Store user data in localStorage
      const expiration = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem("token", `dummy-token-${Date.now()}`);
      localStorage.setItem("tokenExpiration", expiration.toString());
      localStorage.setItem("email", ADMIN_USER.email);
      localStorage.setItem("username", ADMIN_USER.username);
      
      toast.success("Login successful!");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    
    // Check if email matches admin email
    if (forgotPasswordEmail === ADMIN_USER.email) {
      // Generate a reset token and store it
      const resetToken = `reset-${Date.now()}`;
      localStorage.setItem("resetToken", resetToken);
      localStorage.setItem("resetEmail", forgotPasswordEmail);
      
      toast.success("Password reset link has been sent to your email");
      setShowForgotPassword(false);
    } else {
      toast.error("Email not found");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo} // Replace with actual logo URL
            alt="BeautyBarn Logo"
            className="h-12"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
          Login <br/>
          <p>"Enter this to login: email:apply@superlabs.co, password:supersecret"</p>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-500 rounded text-sm">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
              value={values.email}
              name="email"
              onChange={handleChanges}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChanges}
              required
              minLength={6}
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Continue
          </button>

          {/* Forgot Password */}
          <p className="text-center text-sm text-gray-600 mt-4">
            <a
              href="#"
              className="text-pink-500 hover:underline"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </a>
          </p>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
              Forgot Password
            </h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="forgotPasswordEmail"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={handleForgotPasswordChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                onClick={() => setShowForgotPassword(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;