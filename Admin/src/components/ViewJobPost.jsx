import {
  Dialog,
  IconButton,
  Typography,
  DialogHeader,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../index.css";

function ViewJobPost({ setOpen, handleOpen, viewId, setView }) {
  const [jobData, setJobData] = useState({
    job_title: "",
    job_location_type: [],
    job_category: "",
    job_type: [],
    job_location: "",
    job_experience_level: "",
    job_technical_skills: [],
    job_education_qualification: [],
    job_description: "",
    job_vacancy: "",
    job_interview_rounds: "",
    job_budget: "",
    job_create_date: "",
    job_close_date: "",
    job_status: "",
  });

  useEffect(() => {
    // Get job data from localStorage
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const job = jobs.find((j) => j.id === viewId);
    if (job) {
      setJobData(job);
    }
  }, [viewId]);

  function handleClose() {
    setView(false);
  }

  return (
    <div>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-4 scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-[600px] overflow-y-scroll"
      >
        <DialogHeader className="relative font-Josefin block space-y-4 pb-6">
          <Typography className="font-Josefin" variant="h4" color="blue-gray">
            Detailed JobPost View
          </Typography>
          <Typography className="mt-1 font-Josefin font-medium text-gray-600">
            Read down for Jobpost details
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>

          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="text-left font-Josefin font-medium"
            >
              Title :
            </Typography>
            <div className="text-base">{jobData.job_title}</div>
          </div>

          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Location Type :
            </Typography>
            <div className="text-base">
              {jobData.job_location_type.join(", ")}
            </div>
          </div>

          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Category :
            </Typography>
            <div className="text-base">{jobData.job_category}</div>
          </div>

          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Type :
            </Typography>
            <div className="text-base">{jobData.job_type.join(", ")}</div>
          </div>

          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Location :
            </Typography>
            <div className="text-base">{jobData.job_location}</div>
          </div>
          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Experience Level :
            </Typography>
            <div className="text-base">{jobData.job_experience_level}</div>
          </div>
          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Mandatory Technical Skills :
            </Typography>
            <div className="text-base">{jobData.job_technical_skills.join(", ")}</div>
          </div>
          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Education Qualification :
            </Typography>
            <div className="text-base">{jobData.job_education_qualification.join(", ")}</div>
          </div>
          <div className="font-Josefin flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium font-Josefin"
            >
              Job Description :
            </Typography>
            <div className="text-base">
              <div
                dangerouslySetInnerHTML={{
                  __html: jobData.job_description,
                }}
              ></div>
            </div>
          </div>
          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Vacancy :
            </Typography>
            <div className="text-base">{jobData.job_vacancy}</div>
          </div>
          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Interview Rounds :
            </Typography>
            <div className="text-base">{jobData.job_interview_rounds}</div>
          </div>

          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Budget :
            </Typography>

            <div className="text-base">{jobData.job_budget}</div>
          </div>

          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Created Date :
            </Typography>
            <div className="text-base">{jobData.job_create_date}</div>
          </div>
          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Valid Through :
            </Typography>
            <div className="text-base">{jobData.job_close_date}</div>
          </div>
          <div className="flex space-x-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Status :
            </Typography>
            <div className="text-base">{jobData.job_status}</div>
          </div>
        </DialogHeader>
      </Dialog>
    </div>
  );
}

export default ViewJobPost;
