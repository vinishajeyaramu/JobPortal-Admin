import { useState, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobApplicationForm() {
  const { id, jobtitle } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    resume: null,
    cover_letter: null,
    job_id: id,
    job_title: jobtitle,
  });

  const [errors, setErrors] = useState({});
  const [fileMessages, setFileMessages] = useState({});

  const fieldRefs = {
    first_name: useRef(null),
    last_name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    linkedin: useRef(null),
    resume: useRef(null),
    cover_letter: useRef(null),
  };

  // Validation functions
  const validateLinkedIn = (username) => /^[a-zA-Z0-9-]+$/.test(username);
  const validateName = (value) => /^[A-Za-z\s]+$/.test(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if ((name === 'first_name' || name === 'last_name') && value !== '') {
      if (!validateName(value)) return;
    }
    
    if (name === 'phone' && !/^\d*$/.test(value)) return;
    
    if (name === 'linkedin') {
      const username = value.replace(/^.*linkedin\.com\/in\//i, '').replace(/\/.*/g, '');
      setFormData(prev => ({ ...prev, [name]: username }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        setErrors(prev => ({ ...prev, [name]: "Only PDF files are allowed" }));
        setFormData(prev => ({ ...prev, [name]: null }));
        setFileMessages(prev => ({ ...prev, [name]: "" }));
      } else if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [name]: "File size should be less than 5MB" }));
        setFormData(prev => ({ ...prev, [name]: null }));
        setFileMessages(prev => ({ ...prev, [name]: "" }));
      } else {
        setErrors(prev => ({ ...prev, [name]: "" }));
        setFormData(prev => ({ ...prev, [name]: file }));
        setFileMessages(prev => ({ ...prev, [name]: "PDF has been uploaded" }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: null }));
      setFileMessages(prev => ({ ...prev, [name]: "" }));
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    } else if (!validateName(formData.first_name)) {
      newErrors.first_name = "First name should only contain letters";
    }
  
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    } else if (!validateName(formData.last_name)) {
      newErrors.last_name = "Last name should only contain letters";
    }
  
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
  
    if (!formData.linkedin) {
      newErrors.linkedin = "LinkedIn username is required";
    } else if (!validateLinkedIn(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn username";
    }
  
    if (!formData.resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      fieldRefs[firstError]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      fieldRefs[firstError]?.current?.focus();
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Get existing applications from localStorage
      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      
      // Check if email already exists
      const emailExists = applications.some(app => app.email === formData.email);
      if (emailExists) {
        setErrors(prev => ({ ...prev, email: "Email already exists" }));
        fieldRefs.email?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        fieldRefs.email?.current?.focus();
        return;
      }

      // Add new application
      const newApplication = {
        ...formData,
        id: Date.now(),
        applicationDate: new Date().toISOString(),
        status: 'pending'
      };

      applications.push(newApplication);
      localStorage.setItem('jobApplications', JSON.stringify(applications));

      toast.success("Application submitted successfully!");
      setTimeout(() => {
        navigate("/success");
      }, 2000);
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 mx-auto items-center justify-center">
      <NavLink to={`/job/${id}/${jobtitle}`} className="text-red-600 flex items-center">
        <ArrowBackIosIcon /> <p>Back to Job Description</p>
      </NavLink>
      <h2 className="lg:text-3xl text-2xl text-red-600 font-bold">
        {jobtitle}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-lg"
      >
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold">Personal Information</h3>

          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="relative mb-6 w-full">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                First Name *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                ref={fieldRefs.first_name}
                onChange={handleChange}
                className="block w-full h-11 px-5 py-2.5 bg-white shadow-[0_4px_6px_-1px_rgba(254,202,202,0.5),0_2px_4px_-1px_rgba(254,202,202,0.5)] leading-7 text-base font-normal text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                />
              {errors.first_name && (
                <p className="text-red-500 text-sm">{errors.first_name}</p>
              )}
            </div>
            <div className="relative mb-6 w-full">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                Last Name *
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                ref={fieldRefs.last_name}
                onChange={handleChange}
                className="block w-full h-11 px-5 py-2.5 bg-white shadow-[0_4px_6px_-1px_rgba(254,202,202,0.5),0_2px_4px_-1px_rgba(254,202,202,0.5)] leading-7 text-base font-normal text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                />
              {errors.last_name && (
                <p className="text-red-500 text-sm">{errors.last_name}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="relative mb-6 w-full">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                name="email"
                ref={fieldRefs.email}
                value={formData.email}
                onChange={handleChange}
                className="block w-full h-11 px-5 py-2.5 bg-white shadow-[0_4px_6px_-1px_rgba(254,202,202,0.5),0_2px_4px_-1px_rgba(254,202,202,0.5)] leading-7 text-base font-normal text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="relative mb-6 w-full">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                ref={fieldRefs.phone}
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                placeholder="Enter 10 digit number"
                className="block w-full h-11 px-5 py-2.5 bg-white shadow-[0_4px_6px_-1px_rgba(254,202,202,0.5),0_2px_4px_-1px_rgba(254,202,202,0.5)] leading-7 text-base font-normal text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Resume/CV *
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            ref={fieldRefs.resume}
            className="text-gray-500 font-medium w-full text-base file:cursor-pointer cursor-pointer file:text-black file:border-0 file:py-2.5 border file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-red-500 rounded"
            
          />
          {errors.resume && (
            <p className="text-red-500 text-sm">{errors.resume}</p>
          )}
          {fileMessages.resume && (
            <p className="text-green-500 text-sm">{fileMessages.resume}</p>
          )}
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Cover Letter (Optional)
          </label>
          <input
            type="file"
            name="cover_letter"
            onChange={handleFileChange}
            className="text-gray-500 font-medium w-full text-base file:cursor-pointer cursor-pointer file:text-black file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-red-500 rounded border"
          />
          {errors.cover_letter && (
            <p className="text-red-500 text-sm">{errors.cover_letter}</p>
          )}
          {fileMessages.cover_letter && (
            <p className="text-green-500 text-sm">{fileMessages.cover_letter}</p>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold">Additional Information</h3>

          <div className="relative mb-6 w-full">
            <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              LinkedIn Profile *
            </label>
            <input
              type="text"
              name="linkedin"
              placeholder="Enter your LinkedIn username (e.g. johnsmith)"
              value={formData.linkedin}
              ref={fieldRefs.linkedin}
              onChange={handleChange}
              className="block w-full h-11 px-5 py-2.5 bg-white shadow-[0_4px_6px_-1px_rgba(254,202,202,0.5),0_2px_4px_-1px_rgba(254,202,202,0.5)] leading-7 text-base font-normal text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
              
            />
            {errors.linkedin && (
              <p className="text-red-500 text-sm">{errors.linkedin}</p>
            )}
          </div>
          <div className="relative mb-6 w-full">
            <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              Website
            </label>
            <input
              type="url"
              name="website"
              placeholder="Please mention your website"
              value={formData.website}
              onChange={handleChange}
              className="block w-full h-11 px-5 py-2.5 bg-white shadow-[0_4px_6px_-1px_rgba(254,202,202,0.5),0_2px_4px_-1px_rgba(254,202,202,0.5)] leading-7 text-base font-normal text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
              />
             {/* {errors.website && (
              <p className="text-red-500 text-sm">{errors.website}</p>
            )} */}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="md:w-52 w-full h-12 bg-red-600 hover:bg-red-800 transition-all duration-700 rounded-md drop-shadow-lg text-white text-base font-semibold leading-6 mb-6"
          >
            Apply
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default JobApplicationForm;