import { Link } from "react-router-dom";
import errorImage from "../assets/Darknet-404-Page-Concept.png"; // Make sure to add an error image in your assets folder

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col items-center lg:items-start space-y-6 lg:w-1/2 text-center lg:text-left">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 
                     transition-colors duration-300 inline-block"
        >
          Back to Home
        </Link>
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <img
          src={errorImage}
          alt="404 Error"
          className="max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default Error404;
