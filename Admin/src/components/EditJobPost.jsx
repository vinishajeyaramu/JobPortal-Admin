import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import toast from "react-hot-toast";

// Initial data (replace API calls)
const initialCategories = [
  { category_id: 1, category_title: "Engineering" },
  { category_id: 2, category_title: "Design" },
];

const initialLocations = [
  { location_id: 1, location_title: "New York" },
  { location_id: 2, location_title: "Remote" },
];

function EditJobPost({
  setOpen,
  handleOpen,
  isEdit,
  editId,
  setIsEdit,
  job,
  setJob,
  onSuccess,
}) {
  // Remove environment variables and axios imports
  const [selectedJobTypeValues, setSelectedJobTypeValues] = useState([]);
  const [selectedJobLocationTypeValues, setSelectedJobLocationTypeValues] =
    useState([]);
  const [category, setCategory] = useState(initialCategories);
  const [location, setLocation] = useState(initialLocations);
  const [jobTechSkills, setJobTechSkills] = useState("");
  const [techSkillsValues, setTechSkillsValues] = useState([]);
  const [education, setEducation] = useState("");
  const [educationalValues, setEducationalValues] = useState([]);
  const [closeDate, setCloseDate] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [errors, setErrors] = useState({});
  const [editJobPost, setEditJobPost] = useState({
    job_title: "",
    job_location_type: [],
    job_category: "",
    job_type: [],
    job_location: "",
    job_experience_level: "",
    job_technical_skills: "",
    job_education_qualification: "",
    job_description: "",
    job_vacancy: "",
    job_interview_rounds: "",
    job_budget: "",
    job_create_date: "",
    job_close_date: "",
    job_status: "",
  });

  // Replace API call with localStorage
  useEffect(() => {
    if (editId) {
      const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      const jobToEdit = jobs.find((j) => j.id === editId);

      if (jobToEdit) {
        setEditJobPost(jobToEdit);
        setSelectedJobTypeValues(jobToEdit.job_type || []);
        setSelectedJobLocationTypeValues(jobToEdit.job_location_type || []);
        setTechSkillsValues(jobToEdit.job_technical_skills || []);
        setEducationalValues(jobToEdit.job_education_qualification || []);
        setCloseDate(jobToEdit.job_close_date || "");
        setCreateDate(jobToEdit.job_create_date || "");
      }
    }
  }, [editId]);

  // 3. Fix the handleSubmit function
  async function handleSubmit(e) {
    e.preventDefault();

    // Validation checks
    const errors = {};
    if (!editJobPost.job_title) errors.job_title = "Job title is required.";
    if (!selectedJobLocationTypeValues.length)
      errors.selectedJobLocationTypeValues = "Select at least one location type.";
    if (!editJobPost.job_category) errors.job_category = "Job category is required.";
    if (!selectedJobTypeValues.length)
      errors.selectedJobTypeValues = "Select at least one job type.";
    if (!editJobPost.job_location) errors.job_location = "Job location is required.";
    if (!editJobPost.job_experience_level)
      errors.job_experience_level = "Experience level is required.";
    if (!techSkillsValues.length)
      errors.techSkillsValues = "At least one technical skill is required.";
    if (!educationalValues.length)
      errors.educationalValues = "Education qualification is required.";
    if (!editJobPost.job_description) errors.job_description = "Job description is required.";
    if (!editJobPost.job_vacancy) errors.job_vacancy = "Vacancy must be specified.";
    if (!editJobPost.job_interview_rounds)
      errors.job_interview_rounds = "Interview rounds must be specified.";
    if (!editJobPost.job_budget) errors.job_budget = "Budget is required.";
    if (!createDate) errors.createDate = "Created date is required.";
    if (!closeDate) errors.closeDate = "Closing date is required.";
    if (!editJobPost.job_status) errors.job_status = "Job status is required.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const updatedJob = {
        ...editJobPost,
        id: editId,
        job_location_type: selectedJobLocationTypeValues,
        job_type: selectedJobTypeValues,
        job_technical_skills: techSkillsValues,
        job_education_qualification: educationalValues,
        job_create_date: createDate,
        job_close_date: closeDate,
        updated_at: new Date().toISOString(),
      };

      // Get current jobs from localStorage
      const currentJobs = JSON.parse(localStorage.getItem("jobs") || "[]");

      // Update the specific job
      const updatedJobs = currentJobs.map((j) =>
        j.id === editId ? updatedJob : j
      );

      // Save back to localStorage
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      // Update state
      setJob(updatedJobs);
      
      // Close the dialog
      setIsEdit(false);
      
      toast.success("Job Updated Successfully!");
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Job Update Failed!");
    }
  }

  function handleOpen() {
    setOpen(!open);
  }

  // 2. Fix the handleClose function
  function handleClose() {
    setIsEdit(false);
  }

  const handleSingleFieldChange = (e) => {
    setEditJobPost({ ...editJobPost, [e.target.name]: e.target.value });
  };

  // Job Type

  function handleJobTypeChange(e) {
    const isSelected = e.target.checked;
    const value = e.target.value;
    if (isSelected) {
      setSelectedJobTypeValues([...selectedJobTypeValues, value]);
    } else {
      setSelectedJobTypeValues((prevData) => {
        return prevData.filter((jobType) => {
          return jobType !== value;
        });
      });
    }
  }

  // Job Location Type

  function handleJobLocationTypeChange(e) {
    const isSelected = e.target.checked;
    const value = e.target.value;
    if (isSelected) {
      setSelectedJobLocationTypeValues([...selectedJobLocationTypeValues, value]);
    } else {
      setSelectedJobLocationTypeValues((prevData) => {
        return prevData.filter((jobLocationType) => {
          return jobLocationType !== value;
        });
      });
    }
  }

  // Job Created Date

  const handleCreatedDate = (e) => {
    setCreateDate(e.target.value);
    setEditJobPost({ ...editJobPost, job_create_date: createDate });
  };

  // Job Close Date

  const handleCloseDate = (e) => {
    setCloseDate(e.target.value);
    setEditJobPost({ ...editJobPost, job_close_date: closeDate });
  };

  // Job Description

  const handleJobDescription = (value) => {
    setEditJobPost({ ...editJobPost, job_description: value });
  };

  // Educational Qualification

  const handleInputEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleKeyDownEducation = (e) => {
    if (e.key === "Enter") {
      addEduValue();
    }
  };

  const addEduValue = () => {
    if (education !== "") {
      setEducationalValues([...educationalValues, education]);
      setEducation("");
    }
  };

  const removeEducation = (index) => {
    const newlocationValues = educationalValues.filter((_, i) => i !== index);
    setEducationalValues(newlocationValues);
  };

  // Mandatory Technical Skills

  const handleInputTechSkillsChange = (e) => {
    setJobTechSkills(e.target.value);
  };

  const handleKeyDownTechSkills = (e) => {
    if (e.key === "Enter") {
      addTechValue();
    }
  };

  const addTechValue = () => {
    if (jobTechSkills !== "") {
      setTechSkillsValues([...techSkillsValues, jobTechSkills]);
      setJobTechSkills("");
    }
  };

  const removeTechnicalSkills = (index) => {
    const newlocationValues = techSkillsValues.filter((_, i) => i !== index);
    setTechSkillsValues(newlocationValues);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <div>
      <Dialog
        size="lg"
        open={isEdit} // Change from open to isEdit
        handler={handleOpen}
        className="p-4 scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-[600px] overflow-y-scroll"
      >
        <DialogHeader className="relative font-Josefin  block space-y-4 pb-6">
          <Typography className="font-Josefin" variant="h4" color="blue-gray">
            Edit your JobPost
          </Typography>
          <Typography className="mt-1 font-Josefin font-medium text-gray-600">
            Complete the form below with your job details.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Title
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Job Title"
              name="job_title"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_title}
              onChange={(e) => handleSingleFieldChange(e)}
            />
            {errors.job_title && (
              <p className="text-red-500 text-sm">{errors.job_title}</p>
            )}
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Location Type
            </Typography>
            <div className="flex gap-5 text-base">
              {["Onsite", "Remote", "Hybrid"].map((jobLocationType) => (
                <label key={jobLocationType}>
                  <input
                    type="checkbox"
                    value={jobLocationType}
                    checked={selectedJobLocationTypeValues.includes(jobLocationType)}
                    onChange={handleJobLocationTypeChange}
                    className="mr-2"
                  />
                  {jobLocationType}
                </label>
              ))}
            </div>
            {errors.selectedJobLocationTypeValues && (
              <p className="text-red-500 text-sm">{errors.selectedJobLocationTypeValues}</p>
            )}
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Category
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_category"
                value={editJobPost.job_category}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Your Job Category</option>
                {
                  category.map((category) => (
                    <option key={category.category_id} value={category.category_title}>{category.category_title}</option>))
                }
              </select>
            </div>
            {errors.job_category && (
              <p className="text-red-500 text-sm">{errors.job_category}</p>
            )}
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Type
            </Typography>
            <div className="flex gap-5 text-base">
              {["FullTime", "PartTime", "Intership", "Contract"].map((jobType) => (
                <label key={jobType}>
                  <input
                    type="checkbox"
                    value={jobType}
                    checked={selectedJobTypeValues.includes(jobType)}
                    onChange={handleJobTypeChange}
                    className="mr-2"
                  />
                  {jobType}
                </label>
              ))}
            </div>
            {errors.selectedJobTypeValues && (
              <p className="text-red-500 text-sm">{errors.selectedJobTypeValues}</p>
            )}
          </div>
          
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Location
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_location"
                value={editJobPost.job_location}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Your Job Location</option>
                {
                  location.map((location) => (
                    <option key={location.location_id} value={location.location_title}>{location.location_title}</option>))
                }
              </select>
            </div>
            {errors.job_location && (
              <p className="text-red-500 text-sm">{errors.job_location}</p>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Experience Level
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Experience Level"
              name="job_experience_level"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_experience_level}
              onChange={(e) => handleSingleFieldChange(e)}
            />
            {errors.job_experience_level && (
              <p className="text-red-500 text-sm">{errors.job_experience_level}</p>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Mandatory Technical Skills
            </Typography>

            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap border border-gray-300 rounded  w-full">
                {techSkillsValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                  >
                    {value}{" "}
                    <button
                      onClick={() => removeTechnicalSkills(index)}
                      className="bg-red-500 text-white ml-2 px-2 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={jobTechSkills}
                  onChange={handleInputTechSkillsChange}
                  onKeyDown={handleKeyDownTechSkills}
                  placeholder="Enter a value and press Enter"
                  className="flex-grow p-2 text-base border-0 focus:ring-0"
                />
              </div>
            </div>
            {errors.techSkillsValues && (
              <p className="text-red-500 text-sm">{errors.techSkillsValues}</p>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Education Qualification
            </Typography>

            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap border border-gray-300 rounded  w-full">
                {educationalValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                  >
                    {value}{" "}
                    <button
                      onClick={() => removeEducation(index)}
                      className="bg-red-500 text-white ml-2 px-2 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={education}
                  onChange={handleInputEducationChange}
                  onKeyDown={handleKeyDownEducation}
                  placeholder="Enter a value and press Enter"
                  className="flex-grow p-2 text-base border-0 focus:ring-0"
                />
              </div>
            </div>
            {errors.educationalValues && (
              <p className="text-red-500 text-sm">{errors.educationalValues}</p>
            )}
          </div>
          <div className="font-Josefin">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium font-Josefin"
            >
              Job Description
            </Typography>
            <div>
              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline", "strike"],
                    ["link", "image"],
                    [{ align: [] }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "list",
                  "bullet",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "link",
                  "image",
                  "align",
                ]}
                className="mb-4 "
                value={editJobPost.job_description}
                onChange={handleJobDescription}
              />
            </div>
            {errors.job_description && (
              <p className="text-red-500 text-sm">{errors.job_description}</p>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Vacancy
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter total no.of vacancies"
              name="job_vacancy"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_vacancy}
              onChange={(e) => handleSingleFieldChange(e)}
            />
            {errors.job_vacancy && (
              <p className="text-red-500 text-sm">{errors.job_vacancy}</p>
            )}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Interview Rounds
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Interview Rounds"
              name="job_interview_rounds"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_interview_rounds}
              onChange={(e) => handleSingleFieldChange(e)}
            />
            {errors.job_interview_rounds && (
              <p className="text-red-500 text-sm">{errors.job_interview_rounds}</p>
            )}
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Budget
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Job Budget"
              name="job_budget"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={editJobPost.job_budget}
              onChange={(e) => handleSingleFieldChange(e)}
            />
            {errors.job_budget && (
              <p className="text-red-500 text-sm">{errors.job_budget}</p>
            )}
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Created Date
            </Typography>
            <div>
              <input
                type="date"
                value={createDate}
                className="text-base"
                onChange={(e) => handleCreatedDate(e)}
              />
              {errors.createDate && (
                <p className="text-red-500 text-sm">{errors.createDate}</p>
              )}
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Valid Through
            </Typography>
            <div>
              <input
                type="date"
                value={closeDate}
                className="text-base"
                onChange={(e) => handleCloseDate(e)}
              />
              {errors.closeDate && (
                <p className="text-red-500 text-sm">{errors.closeDate}</p>
              )}
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Status
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_status"
                value={editJobPost.job_status}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Status</option>
                <option name="Active" value="Active">
                  Active
                </option>
                <option name="Inactive" value="Inactive">
                  Inactive
                </option>
              </select>
            </div>
            {errors.job_status && (
              <p className="text-red-500 text-sm">{errors.job_status}</p>
            )}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit} className="ml-auto">
            Update
          </Button>
          <Button onClick={handleCancel} className="ml-10 ">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default EditJobPost;
