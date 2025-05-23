import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import ViewCandidate from "../components/ViewCandidate";
import DataTable from "react-data-table-component";

// Initial static candidates data
const initialCandidates = [
  {
    id: 1,
    job_title: "Software Engineer",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    resume: "path/to/resume.pdf",
    status: "Applied"
  }
];

export default function Candidates() {
  const [candidates, setCandidates] = useState(() => {
    const savedCandidates = localStorage.getItem('candidates');
    return savedCandidates ? JSON.parse(savedCandidates) : initialCandidates;
  });
  const [viewId, setViewId] = useState();
  const [query, setQuery] = useState("");

  // Save candidates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const filteredCandidates = candidates.filter((c) => {
    return (
      c?.first_name.toLowerCase().includes(query.toLowerCase()) ||
      c?.last_name.toLowerCase().includes(query.toLowerCase()) ||
      c?.email.toLowerCase().includes(query.toLowerCase()) ||
      c?.job_title.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      setCandidates(candidates.filter(c => c.id !== id));
    }
  };

  const columns = [
    {
      name: "Job Applied",
      selector: (row) => row.job_title,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "View",
      cell: (row) => (
        <Eye className="cursor-pointer" onClick={() => setViewId(row.id)} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (viewId) return <ViewCandidate id={viewId} setViewId={setViewId} />;

  return (
    <div className="p-6 mx-auto flex flex-col gap-5">
      <h2 className="text-2xl font-bold mt-6">Candidates</h2>
      <input
        type="text"
        placeholder="Search..."
        className="input w-full mt-4 p-4 rounded-3xl"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <DataTable
          columns={columns}
          data={filteredCandidates}
          pagination
          paginationPerPage={10}
          highlightOnHover
          pointerOnHover
          responsive
          customStyles={{
            headCells: {
              style: {
                fontWeight: "bold",
                fontSize: "16px",
              },
            },
            cells: {
              style: {
                fontSize: "14px",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
