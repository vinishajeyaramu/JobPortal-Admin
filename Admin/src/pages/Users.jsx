import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Edit, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial static users data
const initialUsers = [
  {
    id: 1,
    username: "admin",
    email: "apply@superlabs.co",
    password: "admin123",
  },
];

const AddUsers = ({ onClose, onSubmit, editData }) => {
  const [userName, setUserName] = useState(editData ? editData.username : "");
  const [userEmail, setUserEmail] = useState(editData ? editData.email : "");
  const [userCredit, setUserCredit] = useState(editData ? editData.password : "");
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!userName.trim()) newErrors.userName = "Name is required";
    if (!userEmail.trim()) {
      newErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      newErrors.userEmail = "Email is invalid";
    }
    if (!userCredit.trim()) {
      newErrors.userCredit = "Password is required";
    } else if (userCredit.length < 6) {
      newErrors.userCredit = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      id: editData ? editData.id : Date.now(),
      username: userName,
      password: userCredit,
      email: userEmail,
    };

    onSubmit(userData, editData ? "update" : "add");
    toast.success(`User ${editData ? "updated" : "added"} successfully!`);
  };

  return (
    <div className="p-6 border bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold text-gray-700">
          {editData ? "Edit User" : "Add User"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName}</p>
        )}
        <input
          type="email"
          placeholder="Enter Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.userEmail && (
          <p className="text-red-500 text-sm">{errors.userEmail}</p>
        )}
        <input
          type="password"
          placeholder="Enter Password"
          value={userCredit}
          onChange={(e) => setUserCredit(e.target.value)}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.userCredit && (
          <p className="text-red-500 text-sm">{errors.userCredit}</p>
        )}
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            {editData ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });
  const [userForm, setUserForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleFormSubmit = (userData, action) => {
    if (action === "add") {
      setUsers((prevUsers) => [...prevUsers, userData]);
    } else if (action === "update") {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userData.id ? userData : user))
      );
    }
    setUserForm(false);
    setEditData(null);
  };

  const handleEdit = (user) => {
    setEditData(user);
    setUserForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    }
  };

  return (
    <main className="flex flex-col items-center w-full px-6">
      <ToastContainer />
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-2xl font-bold text-gray-700">Users</h1>
          <button
            onClick={() => {
              setEditData(null);
              setUserForm(true);
            }}
            className="text-sm font-medium border bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + Add User
          </button>
        </div>

        {userForm && (
          <AddUsers
            onClose={() => setUserForm(false)}
            onSubmit={handleFormSubmit}
            editData={editData}
          />
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-sm font-semibold text-gray-700">
                <th className="py-3 px-4 border text-start">S.No</th>
                <th className="py-3 px-4 border text-start">User Name</th>
                <th className="py-3 px-4 border text-start">User Email</th>
                <th className="py-3 px-4 border text-start">Password</th>
                <th className="py-3 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="text-wrap overflow-hidden w-20">
                        {"•".repeat(8)}
                      </span>
                    </td>
                    <td className="py-1 px-1 space-x-3 text-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No users available.
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

AddUsers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.object,
};

export default Users;
