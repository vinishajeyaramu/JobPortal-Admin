import { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ThemeContext } from "../App";
import AddJob from "../components/AddJobPost";
import EditJobPost from "../components/EditJobPost";
import ViewJobPost from "../components/ViewJobPost";
import { Edit, Eye } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobPost() {
  const { job: jobs, setJob: setJobs } = useContext(ThemeContext);

  const [view, setView] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // Optional: Sync with localStorage on mount if needed
  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, [setJobs]);

  // Filter jobs by title (case-insensitive)
  const filteredItems = jobs.filter((item) =>
    item.job_title?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleView = (id) => {
    setViewId(id);
    setView(true);
  };

  const handleEdit = (row) => {
    const id = row.job_id || row.id;
    setEditId(id);
    setIsEdit(true);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.job_title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Skills",
      selector: (row) => (row.job_technical_skills ? row.job_technical_skills.join(", ") : ""),
      sortable: true,
      wrap: true,
    },
    {
      name: "Location",
      selector: (row) => row.job_location,
      sortable: true,
      wrap: true,
    },
    {
      name: "Category",
      selector: (row) => row.job_category,
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => row.job_status,
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-3">
          <button
            className="rounded-md border-green-500 border-2 p-[3px] text-green-600 hover:text-green-800"
            onClick={() => handleEdit(row)}
            aria-label={`Edit job post: ${row.job_title}`}
          >
            <Edit size={15} />
          </button>
          <button
            className="border-blue-500 text-blue-500 border-2 p-[3px] rounded-md"
            onClick={() => handleView(row.job_id || row.id)}
            aria-label={`View job post: ${row.job_title}`}
          >
            <Eye size={15} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="px-6 bg-gray-100 rounded-md min-h-screen">
      <ToastContainer />
      <div className="flex justify-center items-center bg-slate-100 py-8">
        <div className="flex flex-col h-auto w-full max-w-7xl px-6 shadow-lg rounded-xl bg-white">
          {/* Header and Controls */}
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-bold">Job Posts</h1>
            <div className="flex items-center gap-5">
              <div>
                <input
                  type="text"
                  className="border-2 p-1 rounded-lg"
                  placeholder="Filter by Title"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <button
                  className="bg-black rounded-lg text-white border-2 p-1 ml-2"
                  onClick={() => {
                    setFilterText("");
                    setResetPaginationToggle(!resetPaginationToggle);
                  }}
                  aria-label="Clear filter"
                >
                  Clear
                </button>
              </div>
              <button
                className="w-40 rounded-lg h-8 bg-black text-white"
                onClick={() => setIsAdd(true)}
                aria-label="Create new job post"
              >
                Create JobPost
              </button>
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            persistTableHead
            highlightOnHover
            dense
            noDataComponent="No job posts found"
          />
        </div>
      </div>

      {/* Add Job Post Modal */}
      {isAdd && (
        <AddJob
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          job={jobs}
          setJob={setJobs}
          onSuccess={() => {
            setIsAdd(false);
            const updatedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
            setJobs(updatedJobs);
            toast.success("Job added successfully!");
          }}
        />
      )}

      {/* Edit Job Post Modal */}
      {isEdit && (
        <EditJobPost
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editId={editId}
          job={jobs}
          setJob={setJobs}
          onSuccess={() => {
            setIsEdit(false);
            const updatedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
            setJobs(updatedJobs);
            toast.success("Job updated successfully!");
          }}
        />
      )}

      {/* View Job Post Modal */}
      {view && (
        <ViewJobPost
          jobs={jobs}
          view={view}
          setView={setView}
          viewId={viewId}
        />
      )}
    </div>
  );
}

export default JobPost;
