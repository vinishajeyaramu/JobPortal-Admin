import { useEffect, useState, useRef } from "react";
import { MdWorkOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import RoomIcon from "@mui/icons-material/Room";
import CategoryIcon from "@mui/icons-material/Category";

// Initial static data - Add more realistic job data
const initialJobs = [
  {
    job_id: 1,
    job_title: "Software Engineer",
    job_experience_level: 2,
    job_technical_skills: ["React", "Node.js", "JavaScript"],
    job_location: "Remote",
    job_type: ["Full-time"],
    job_status: "Active",
    job_close_date: "2025-12-31",
    job_category: "Engineering",
  },
];

const initialLocations = [
  { location_id: 1, location_title: "Remote" },
  { location_id: 2, location_title: "On-site" },
];

const initialCategories = [
  { category_id: 1, category_title: "Engineering" },
  { category_id: 2, category_title: "Design" },
];

const HomeClient = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [location, setLocation] = useState(initialLocations);
  const [category, setCategory] = useState(initialCategories);

  // Listen for localStorage changes
  useEffect(() => {
    // Initial load
    const loadJobs = () => {
      const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      setJobs(savedJobs);
    };

    // Load immediately
    loadJobs();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "jobs") {
        loadJobs();
      }
    };

    // Add event listener
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(category));
  }, [category]);

  // Rest of your existing state declarations
  const [openLeft, setOpenLeft] = useState(false);
  const [openLeft2, setOpenLeft2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const jobListRef = useRef(null);

  // Filter active jobs
  const activeJobs = jobs?.filter((job) => {
    if (!job) return false;
    const today = new Date();
    const jobCloseDate = job.job_close_date
      ? new Date(job.job_close_date)
      : null;
    return job.job_status === "Active" && (!jobCloseDate || jobCloseDate > today);
  }) || [];

  useEffect(() => {
    if (jobListRef.current && currentPage > 1) {
      jobListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]); // Only trigger on page changes

  const handleLocationChange = (locationTitle) => {
    setSelectedLocations((prev) =>
      prev.includes(locationTitle)
        ? prev.filter((loc) => loc !== locationTitle)
        : [...prev, locationTitle]
    );
  };

  const handleCategoryChange = (categoryTitle) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryTitle)
        ? prev.filter((cat) => cat !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const filteredJobs = jobs?.filter((job) => {
    if (!job) return false;
    
    const matchesSearch =
      job.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.job_technical_skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.job_location);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.job_category);

    return matchesSearch && matchesLocation && matchesCategory;
  }) || [];

  const filteredLocations = location.filter((loc) =>
    loc.location_title?.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredCategories = category.filter((cat) =>
    cat.category_title?.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openDrawerLeft = () => {
    setOpenLeft(true);
  };

  const openDrawerLeft2 = () => {
    setOpenLeft2(true);
  };

  return (
    <main
      className={`sm:px-5 md:px-10 lg:px-32 flex flex-col lg:flex-row gap-4 py-5 h-full `}
    >
      <section className=" sm:hidden md:hidden lg:flex   ">
        <div className="py-2">
          <h3 className="font-medium text-gray-500">
            {activeJobs.length || filteredJobs.length} jobs
          </h3>
          <h2 className="text-2xl font-semibold py-2">Sort & Filter</h2>
          <p className="text-gray-300 w-full bg-gray-300 h-[1px]" />

          <div>
            <h3
              className="font-medium flex gap-2 text-red-500 text-base py-3 items-center cursor-pointer"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <p>Location</p>
              <ArrowDropDownCircleIcon />
            </h3>
            {isLocationOpen && (
              <div>
                <input
                  type="text"
                  placeholder="Search Locations"
                  className="w-full border border-gray-200 outline-none tracking-wider text-sm text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
                {filteredLocations
                  .slice(0, showAllLocations ? filteredLocations.length : 5)
                  .map((loc, idx) => (
                    <label
                      key={idx}
                      className="flex gap-3 py-1 items-center text-xs text-gray-600 mb-1"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-600 h-5 w-5"
                        checked={selectedLocations.includes(loc.location_title)}
                        onChange={() =>
                          handleLocationChange(loc.location_title)
                        }
                      />
                      <span>{loc.location_title}</span>
                    </label>
                  ))}
                {filteredLocations.length > 5 && (
                  <button
                    className="text-red-500 text-sm mt-2"
                    onClick={() => setShowAllLocations(!showAllLocations)}
                  >
                    {showAllLocations ? "View Less" : "View More"}
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <h3
              className="font-medium flex  gap-2 text-red-500 text-lg py-3 items-center cursor-pointer"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <p className="text-base">Job Categories</p>
              <ArrowDropDownCircleIcon />
            </h3>
            {isCategoryOpen && (
              <div>
                <input
                  type="text"
                  placeholder="Search Categories"
                  className="w-full border border-gray-200 outline-none tracking-wider text-sm text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
                {filteredCategories
                  .slice(0, showAllCategories ? filteredCategories.length : 5)
                  .map((cat, idx) => (
                    <label
                      key={idx}
                      className="flex gap-3 py-1 items-center text-xs text-gray-600 mb-1"
                    >
                      <input
                        type="checkbox"
                        className="accent-red-600 h-5 w-5"
                        checked={selectedCategories.includes(
                          cat.category_title
                        )}
                        onChange={() =>
                          handleCategoryChange(cat.category_title)
                        }
                      />
                      <span>{cat.category_title}</span>
                    </label>
                  ))}
                {filteredCategories.length > 5 && (
                  <button
                    className="text-red-500 text-sm mt-2"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                  >
                    {showAllCategories ? "View Less" : "View More"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="w-full h-full">
        <div className="w-full h-full">
          <input
            type="text"
            placeholder="Search Keywords: Eg:(Python, HR...)"
            className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-3 my-3 px-4 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <div className="flex lg:hidden gap-4 pb-3 w-full h-full">
              <div className="flex border p-2 rounded-lg ">
                {" "}
                <RoomIcon color="disabled" />{" "}
                <button className="" onClick={openDrawerLeft}>
                  Location
                </button>
              </div>
              <div className="flex border p-2 rounded-lg">
                {" "}
                <CategoryIcon color="disabled" />{" "}
                <button className="" onClick={openDrawerLeft2}>
                  Category
                </button>
              </div>
            </div>
            {openLeft && (
              <div className="fixed inset-0 flex items-center justify-center z-50 mx-10">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl z-10 overflow-y-auto max-h-screen">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Select Your Filters</h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setOpenLeft(false)}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <section className="py-2 px-10">
                    <div className="py-2">
                      <div>
                        <h3
                          className="font-medium flex gap-2 text-red-500 text-lg py-3 items-center cursor-pointer"
                          onClick={() => setIsLocationOpen(!isLocationOpen)}
                        >
                          <p>Location</p>
                          <ArrowDropDownCircleIcon />
                        </h3>
                        {isLocationOpen && (
                          <div>
                            <input
                              type="text"
                              placeholder="Search Locations"
                              className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
                              value={locationSearch}
                              onChange={(e) =>
                                setLocationSearch(e.target.value)
                              }
                            />
                            {filteredLocations
                              .slice(
                                0,
                                showAllLocations
                                  ? filteredLocations.length
                                  : 5
                              )
                              .map((loc, idx) => (
                                <label
                                  key={idx}
                                  className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
                                >
                                  <input
                                    type="checkbox"
                                    className="accent-red-600 h-5 w-5"
                                    checked={selectedLocations.includes(
                                      loc.location_title
                                    )}
                                    onChange={() =>
                                      handleLocationChange(loc.location_title)
                                    }
                                  />
                                  <span>{loc.location_title}</span>
                                </label>
                              ))}
                            {filteredLocations.length > 5 && (
                              <button
                                className="text-red-500 text-sm mt-2"
                                onClick={() =>
                                  setShowAllLocations(!showAllLocations)
                                }
                              >
                                {showAllLocations ? "View Less" : "View More"}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
            {openLeft2 && (
              <div className="fixed inset-0 flex items-center justify-center mx-10 z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white rounded-lg shadow-lg px-4 py-6 w-full max-w-3xl z-10 overflow-y-auto max-h-screen">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Select Your Category</h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setOpenLeft2(false)}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <section className="py-2 px-5">
                    <div className="py-2">
                      <div>
                        <h3
                          className="font-medium flex gap-2 text-red-500 text-lg py-3 items-center cursor-pointer"
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                          <p>Job Categories</p>
                          <ArrowDropDownCircleIcon />
                        </h3>
                        {isCategoryOpen && (
                          <div>
                            <input
                              type="text"
                              placeholder="Search Categories"
                              className="w-full border border-gray-200 outline-none tracking-wider text-md text-gray-700 font-medium py-2 px-4 rounded-lg mb-2"
                              value={categorySearch}
                              onChange={(e) =>
                                setCategorySearch(e.target.value)
                              }
                            />
                            {filteredCategories
                              .slice(
                                0,
                                showAllCategories
                                  ? filteredCategories.length
                                  : 5
                              )
                              .map((cat, idx) => (
                                <label
                                  key={idx}
                                  className="flex gap-3 py-1 items-center text-sm text-gray-600 mb-1"
                                >
                                  <input
                                    type="checkbox"
                                    className="accent-red-600 h-5 w-5"
                                    checked={selectedCategories.includes(
                                      cat.category_title
                                    )}
                                    onChange={() =>
                                      handleCategoryChange(cat.category_title)
                                    }
                                  />
                                  <span>{cat.category_title}</span>
                                </label>
                              ))}
                            {filteredCategories.length > 5 && (
                              <button
                                className="text-red-500 text-sm mt-2"
                                onClick={() =>
                                  setShowAllCategories(!showAllCategories)
                                }
                              >
                                {showAllCategories ? "View Less" : "View More"}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
        <div ref={jobListRef}>
          {filteredJobs.length > 0 ? (
            <div className="flex flex-col">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full h-full place-content-start place-items-center">
                {filteredJobs.map((item, index) => (
                  <div
                    key={item.job_id} // Use unique key (job_id) instead of index
                    className="border w-full min-w-[300px] h-[260px] relative border-gray-300 hover:shadow-lg hover:shadow-red-200 rounded-lg py-6 px-6"
                  >
                    <Link to={`/job/${item.job_id}/${item.job_title}`}>
                      <h1 className="text-red-500 text-xl inline font-semibold py-2 hover:cursor-pointer hover:underline">
                        {item.job_title}
                      </h1>
                    </Link>
                    <h3 className="text-xl text-gray-500 mt-4 mb-2">
                      {isNaN(item.job_experience_level)
                        ? item.job_experience_level
                        : `${item.job_experience_level}+ years`}
                    </h3>

                    <div className="flex flex-nowrap gap-2 py-4 overflow-x-auto max-w-full">
                      {item.job_technical_skills.slice(0, 3).map(
                        (skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-red-500 bg-red-50 font-semibold rounded-full px-3 py-1  text-sm text-ellipsis overflow-hidden whitespace-nowrap min-w-[50px] max-w-[80px]"
                            title={skill} // Shows full text on hover
                          >
                            {skill.length > 10
                              ? `${skill.slice(0, 5)}..`
                              : skill}
                          </span>
                        )
                      )}
                      {item.job_technical_skills.length > 3 && (
                        <span className="text-red-500 bg-red-100 font-semibold rounded-full px-3 py-1 text-sm">
                          +{item.job_technical_skills.length - 3}
                        </span>
                      )}
                    </div>
                    <hr className="bg-gray-200 min-h-0.5 mt-3"></hr>
                    <div className="flex justify-between pt-6 font-medium text-base">
                      <p className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="#e60000"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        {item.job_location}
                      </p>
                      <p className="flex items-center gap-1">
                        <MdWorkOutline className="text-red-500 font-bold text-base" />
                        {item.job_type.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center w-full h-full justify-center mt-5">
                <nav>
                  <ul className="flex list-none">
                    <li className="mx-1">
                      <button
                        onClick={prevPage}
                        className={`px-3 py-1 w-24 rounded ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                            : "bg-red-500 text-white"
                        }`}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from(
                      {
                        length: Math.ceil(activeJobs.length / jobsPerPage),
                      },
                      (_, index) => (
                        <li key={index} className="mx-1">
                          <button
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-1  rounded ${
                              currentPage === index + 1
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                    <li className="mx-1">
                      <button
                        onClick={nextPage}
                        className={`px-3 py-1 w-24 rounded ${
                          currentPage ===
                          Math.ceil(activeJobs.length / jobsPerPage)
                            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                            : "bg-red-500 text-white"
                        }`}
                        disabled={
                          currentPage ===
                          Math.ceil(activeJobs.length / jobsPerPage)
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-600 text-lg text-center">
                No jobs available for the selected filters.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try adjusting your search criteria or removing some filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocations([]);
                  setSelectedCategories([]);
                }}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomeClient;