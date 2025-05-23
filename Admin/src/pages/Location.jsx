import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial static locations data
const initialLocations = [
  {
    location_id: 1,
    location_title: "Remote",
  },
];

const AddLocation = ({ onClose, onSubmit, editData, existingLocations }) => {
  const [locationName, setLocationName] = useState(
    editData?.location_title || ""
  );
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!locationName.trim()) {
      newErrors.locationName = "Location name is required";
    } else if (
      existingLocations.some(
        (location) =>
          location.location_title.toLowerCase() === locationName.toLowerCase() &&
          location.location_id !== editData?.location_id
      )
    ) {
      newErrors.locationName = "Location name already exists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const locationData = {
      location_id: editData ? editData.location_id : Date.now(),
      location_title: locationName.trim(),
    };

    onSubmit(locationData, editData ? "update" : "add");
    setLocationName("");
    onClose();
    toast.success(`Location ${editData ? "updated" : "added"} successfully!`);
  };

  return (
    <div className="p-6 border bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        {editData ? "Edit Location" : "Add Location"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Location Name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="border p-2 rounded-md w-full outline-none"
        />
        {errors.locationName && (
          <p className="text-red-500 text-sm">{errors.locationName}</p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            {editData ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

// PropTypes Validation
AddLocation.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    location_id: PropTypes.number,
    location_title: PropTypes.string,
  }),
  existingLocations: PropTypes.arrayOf(
    PropTypes.shape({
      location_id: PropTypes.number,
      location_title: PropTypes.string,
    })
  ).isRequired,
};

const Location = () => {
  const [locations, setLocations] = useState(() => {
    const savedLocations = localStorage.getItem("locations");
    console.log("Loaded locations from localStorage:", savedLocations);
    return savedLocations ? JSON.parse(savedLocations) : initialLocations;
  });
  const [locationForm, setLocationForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // Save locations to localStorage whenever they change
  useEffect(() => {
    console.log("Saving locations to localStorage:", locations);
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  const handleFormSubmit = (updatedLocation, action) => {
    if (action === "add") {
      setLocations((prev) => [...prev, updatedLocation]);
    } else {
      setLocations((prev) =>
        prev.map((loc) =>
          loc.location_id === updatedLocation.location_id
            ? updatedLocation
            : loc
        )
      );
    }
    setLocationForm(false);
    setEditData(null);
  };

  const handleEdit = (location) => {
    setEditData(location);
    setLocationForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations((prev) => prev.filter((loc) => loc.location_id !== id));
      toast.success("Location deleted successfully!");
    }
  };

  return (
    <main className="flex-grow px-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Locations</h1>
          <button
            onClick={() => {
              setEditData(null);
              setLocationForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-md"
          >
            <Plus size={18} /> Add Location
          </button>
        </div>

        {/* Location Form */}
        {locationForm && (
          <AddLocation
            onClose={() => setLocationForm(false)}
            onSubmit={handleFormSubmit}
            editData={editData}
            existingLocations={locations}
          />
        )}

        {/* Locations Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-800">
              <tr className="text-left text-sm font-semibold">
                <th className="py-3 px-4 border">S.No</th>
                <th className="py-3 px-4 border">Location</th>
                <th className="py-3 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0 ? (
                locations.map((location, index) => (
                  <tr
                    key={location.location_id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{location.location_title}</td>
                    <td className="py-3 px-4 flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(location)}
                        className="text-green-600 hover:text-green-800"
                        aria-label={`Edit location ${location.location_title}`}
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(location.location_id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Delete location ${location.location_title}`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No locations available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Location;
