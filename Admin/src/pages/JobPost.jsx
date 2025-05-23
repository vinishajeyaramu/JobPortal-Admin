import { useState, useContext } from "react";
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
  const [viewId, setViewId] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = jobs.filter((item) =>
    item.job_title?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleView = (id) => {
    setView(true);
    setViewId(id);
  };

  const handleEdit = (row) => {
    const id = row.id || row.job_id;
    setEditId(id);
    setIsEdit(true);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.job_title,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) => row.job_technical_skills?.join(", "),
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.job_location,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.job_category,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.job_status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-5">
          <button
            className="rounded-md border-green-500 border-2 p-[3px] text-green-600 hover:text-green-800"
            onClick={() => handleEdit(row)}
          >
            <Edit size={15} />
          </button>
          <button
            className="border-blue-500 text-blue-500 border-2 p-[3px] rounded-md"
            onClick={() => handleView(row.job_id || row.id)}
          >
            <Eye size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-6 bg-gray-100 rounded-md">
      <ToastContainer />
      <div className="flex justify-center items-center bg-slate-100">
        <div className="flex pt-6 flex-col h-auto w-full px-6 shadow-lg rounded-xl bg-white">
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-bold">JobPost</h1>
            <div className="flex gap-5">
              <div>
                <input
                  type="text"
                  className="border-2 p-1 rounded-lg"
                  placeholder="Filter By Name"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <button
                  className="bg-black rounded-lg text-white border-2 p-1 ml-2"
                  onClick={() => {
                    setFilterText("");
                    setResetPaginationToggle(!resetPaginationToggle);
                  }}
                >
                  Clear
                </button>
              </div>
              <button
                className="w-40 rounded-lg h-8 bg-black text-white"
                onClick={() => setIsAdd(true)}
              >
                Create JobPost
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            persistTableHead
          />
        </div>
      </div>

      {isAdd && (
        <AddJob
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          job={jobs}
          setJob={setJobs}
          setOpen={setIsAdd}
          onSuccess={() => {
            setIsAdd(false);
            const updatedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
            setJobs(updatedJobs);
            toast.success("Job added successfully!");
          }}
        />
      )}

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
