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

function AddJob({ handleOpen, setOpen, isAdd, job, setJob, setIsAdd, onSuccess }) {
  const [open, setOpenDialog] = useState(isAdd); // Add this line

  // Initialize states
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [errors, setErrors] = useState({}); // Change from array to object
  const [newJobPost, setNewJobPost] = useState({
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
    job_created_by: "",
  });
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [createDate, setCreateDate] = useState("");
  const [closeDate, setCloseDate] = useState("");

  // Load categories and locations from localStorage
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    const savedLocations = JSON.parse(localStorage.getItem('locations') || '[]');
    setCategory(savedCategories);
    setLocation(savedLocations);
  }, []);

  // Set created by from localStorage
  useEffect(() => {
    const created_by = localStorage.getItem("username");
    setNewJobPost(prev => ({ ...prev, job_created_by: created_by || "" }));
  }, []);

  // Update useEffect to handle dialog state
  useEffect(() => {
    setOpenDialog(isAdd);
  }, [isAdd]);

  function handleOpen() {
    setOpenDialog(!open);
    setOpen(!open);
  }

  function handleClose() {
    setOpenDialog(false);
    setIsAdd(false);
  }

  const handleSingleFieldChange = (e) => {
    setNewJobPost({ ...newJobPost, [e.target.name]: e.target.value });
  };

  // Job Created Date

  const handleCreatedDate = (e) => {
    const date = e.target.value;
    setCreateDate(date);
    setNewJobPost(prev => ({ ...prev, job_create_date: date }));
  };

  // Job Close Date

  const handleCloseDate = (e) => {
    const date = e.target.value;
    setCloseDate(date);
    setNewJobPost(prev => ({ ...prev, job_close_date: date }));
  };

  // Job Description

  const handleJobDescription = (value) => {
    setNewJobPost({ ...newJobPost, job_description: value });
  };

  // Educational Qualification

  const [education, setEducation] = useState("");
  const [educationalValues, setEducationalValues] = useState([]);

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

  const [jobTechSkills, setJobTechSkills] = useState("");
  const [techSkillsValues, setTechSkillsValues] = useState([]);

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

  // Job Location Type

  const handleLocationType = (event) => {
    const value = event.target.value;
    setLocationType((prevlocationValues) =>
      prevlocationValues.includes(value)
        ? prevlocationValues.filter((v) => v !== value)
        : [...prevlocationValues, value]
    );
  };

  // Job Type

  const handleJobType = (event) => {
    const value = event.target.value;
    setJobType((prevlocationValues) =>
      prevlocationValues.includes(value)
        ? prevlocationValues.filter((v) => v !== value)
        : [...prevlocationValues, value]
    );
  };

  // 2. Update the handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validation checks
    const errors = {};
    
    if (!newJobPost.job_title) errors.job_title = "Job title is required.";
    if (locationType.length === 0) errors.locationType = "Select at least one location type.";
    if (!newJobPost.job_category) errors.job_category = "Job category is required.";
    if (jobType.length === 0) errors.jobType = "Select at least one job type.";
    if (!newJobPost.job_location) errors.job_location = "Job location is required.";
    if (!newJobPost.job_experience_level) errors.job_experience_level = "Experience level is required.";
    if (techSkillsValues.length === 0) errors.techSkillsValues = "At least one technical skill is required.";
    if (educationalValues.length === 0) errors.educationalValues = "Education qualification is required.";
    if (!newJobPost.job_description) errors.job_description = "Job description is required.";
    if (!newJobPost.job_vacancy) errors.job_vacancy = "Vacancy must be specified.";
    if (!newJobPost.job_interview_rounds) errors.job_interview_rounds = "Interview rounds must be specified.";
    if (!newJobPost.job_budget) errors.job_budget = "Budget is required.";
    if (!createDate) errors.createDate = "Created date is required.";
    if (!closeDate) errors.closeDate = "Closing date is required.";
    if (!newJobPost.job_status) errors.job_status = "Job status is required.";

    // If errors exist, prevent submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Create new job object with all required fields
      const newJob = {
        id: Date.now(),
        job_title: newJobPost.job_title,
        job_location_type: locationType,
        job_category: newJobPost.job_category,
        job_type: jobType,
        job_location: newJobPost.job_location,
        job_experience_level: newJobPost.job_experience_level,
        job_technical_skills: techSkillsValues,
        job_education_qualification: educationalValues,
        job_description: newJobPost.job_description,
        job_vacancy: newJobPost.job_vacancy,
        job_interview_rounds: newJobPost.job_interview_rounds,
        job_budget: newJobPost.job_budget,
        job_create_date: createDate,
        job_close_date: closeDate,
        job_status: newJobPost.job_status,
        created_at: new Date().toISOString()
      };

      // Get existing jobs
      const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      
      // Add new job
      const updatedJobs = [...existingJobs, newJob];
      
      // Save to localStorage
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      
      // Update parent state
      setJob(updatedJobs);
      
      // Reset form
      setNewJobPost({
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
      setLocationType([]);
      setJobType([]);
      setTechSkillsValues([]);
      setEducationalValues([]);
      setCreateDate("");
      setCloseDate("");
      
      // Close dialog
      setOpenDialog(false);
      setIsAdd(false);
      
      toast.success("Job Added Successfully!");
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error("Failed to add job!");
    }
  }

  return (
    <div>
      <Dialog
        size="lg"
        open={isAdd} // Change from open to isAdd
        handler={handleOpen}
        className="p-4 scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-[600px] overflow-y-scroll"
      >
        <DialogHeader className="relative font-Josefin  block space-y-4 pb-6">
          <Typography className="font-Josefin" variant="h4" color="blue-gray">
            Create your JobPost
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
              value={newJobPost.job_title}
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
              <label>
                <input
                  type="checkbox"
                  value="Onsite"
                  className="mr-2"
                  onChange={(event) => handleLocationType(event)}
                />
                Onsite
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="Remote"
                  className="mr-2"
                  onChange={(event) => handleLocationType(event)}
                />
                Remote
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="Hybrid"
                  className="mr-2"
                  onChange={(event) => handleLocationType(event)}
                />
                Hybrid
              </label>
            </div>
            {errors.locationType && (
              <p className="text-red-500 text-sm">{errors.locationType}</p>
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
                className="p-2 border border-gray-300 outline-none"
                name="job_category"
                value={newJobPost.job_category}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Your Job Category</option>
                {category.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_title}
                  >
                    {category.category_title}
                  </option>
                ))}
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
              <label>
                <input
                  type="checkbox"
                  value="FullTime"
                  className="mr-2"
                  onChange={(event) => handleJobType(event)}
                />
                Full Time
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="PartTime"
                  className="mr-2"
                  onChange={(event) => handleJobType(event)}
                />
                Part Time
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="Intership"
                  className="mr-2"
                  onChange={(event) => handleJobType(event)}
                />
                Intership
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="Contract"
                  className="mr-2"
                  onChange={(event) => handleJobType(event)}
                />
                Contract
              </label>
            </div>
            {errors.jobType && (
              <p className="text-red-500 text-sm">{errors.jobType}</p>
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
            <div className="flex text-base flex-col items-start font-Josefin outline-none">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 outline-none"
                name="job_location"
                value={newJobPost.job_location}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Your Job Location</option>
                {location.map((location) => (
                  <option
                    key={location.location_id}
                    value={location.location_title}
                  >
                    {location.location_title}
                  </option>
                ))}
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
              value={newJobPost.job_experience_level}
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
                    {value}
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
                value={newJobPost.job_description}
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
              Vacancies
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter total no.of vacancies"
              name="job_vacancy"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={newJobPost.job_vacancy}
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
              value={newJobPost.job_interview_rounds}
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
              value={newJobPost.job_budget}
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
                className="p-2 border border-gray-300 outline-none"
                name="job_status"
                value={newJobPost.job_status}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option name="null">Choose Status</option>
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
            submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default AddJob;