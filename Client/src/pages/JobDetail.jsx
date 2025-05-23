import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState({});

  useEffect(() => {
    // Get jobs from localStorage
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const job = jobs.find((j) => j.job_id.toString() === id);

    if (!job || job.job_status !== "Active") {
      navigate("/expired");
    } else {
      setJobDetail(job);
    }
  }, [id, navigate]);

  // Check if job details are loaded
  if (!jobDetail.job_id) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <main className="sm:px-10 md:px-20 py-10">
      <p
        onClick={() => navigate("/")}
        className="text-red-500 flex items-center text-lg font-semibold cursor-pointer"
      >
        <FaChevronLeft /> Back to Careers Page
      </p>

      <div className="py-7">
        <h1 className="text-3xl font-semibold">{jobDetail.job_title}</h1>
        <div className="py-4 pb-6 gap-5">
          <ul className="list-none text-red-500 font-bold  space-y-3 ">
            <div className="flex sm:flex-col lg:flex-row gap-3 lg:space-x-5">
              <li className=" gap-1 w-auto">
                Job Type:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_type?.join(", ")}
                </span>
              </li>
              <li className=" gap-1 w-auto">
                Job Location Type:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_location_type?.join(", ")}
                </span>
              </li>
              <li className=" gap-1 w-auto">
                Qualifications:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_education_qualification?.join(", ")}
                </span>
              </li>
            </div>
            <div className="flex sm:flex-col lg:flex-row gap-3 lg:space-x-5">
              <li className=" gap-1 w-auto">
                Experience Level:{" "}
                <span className="text-black font-normal">
                  {isNaN(jobDetail.job_experience_level)
                    ? jobDetail.job_experience_level
                    : `${jobDetail.job_experience_level} Years`}
                </span>
              </li>
              <li className=" gap-1 w-auto">
                Interview Rounds:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_interview_rounds} Rounds
                </span>
              </li>
              <li className=" gap-1 w-auto">
                Location:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_location}
                </span>
              </li>
              <li className=" gap-1 w-auto">
                Salary:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_budget}
                </span>
              </li>
            </div>
            <div className="flex sm:flex-col lg:flex-row gap-3 lg:space-x-5">
              <li className=" gap-1 w-auto">
                Total Vacancies:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_vacancy} Vacancies
                </span>
              </li>
              <li className=" gap-1 w-auto">
                Date Posted:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_create_date}
                </span>
              </li>
              <li className=" gap-1 w-auto">
                Valid Till:{" "}
                <span className="text-black font-normal">
                  {jobDetail.job_close_date}
                </span>
              </li>
            </div>
          </ul>
        </div>
        {jobDetail.job_technical_skills?.length > 0 && (
          <div className="-mt-6 py-4">
            <h3 className="text-xl font-semibold">Mandatory Technical Skills:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {jobDetail.job_technical_skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-red-500 bg-red-100 font-semibold rounded-full px-3 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap min-w-[50px] max-w-[150px]"
                  title={skill}
                >
                  {skill.length > 20 ? `${skill.slice(0, 18)}... ` : skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {Date.now() > new Date(jobDetail.job_close_date).getTime() ? (
          <button
            disabled
            className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Closed
          </button>
        ) : (
          <button
            onClick={() =>
              navigate(`/job/${jobDetail.job_id}/${jobDetail.job_title}/apply`)
            }
            className=" font-bold bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Apply Now
          </button>
        )}
      </div>

      <div>
        <p>
          <b>About SuperLabs</b>
        </p>
        <br />
        <p>
          SuperLabs is an engineering & IT consulting firm. To know more about
          SuperLabs & the work we do visit Featured Work
        </p>
        <br />
        {/* <p>
          <b>Growth Marketing Associate at SuperLabs</b>
        </p>
        <br />
        <p>
          Do you crave more than just pushing pixels and posting fluff? Then
          buckle up, because we&apos;re building the future of IT augmentation.
          We&apos;re revolutionizing how companies augment their talent, and we
          need someone who can think outside the box and turn heads with the
          message.
        </p>
        <br />
        <p>
          <b>Here&apos;s Lowdown</b>
        </p>
        <br />
        <ul>
          <li>
            You&apos;ll be the architect of our growth strategy, crafting
            campaigns that explode our user base and dominate the IT
            augmentation space. Think social media magic, content that converts,
            and growth hacking genius. We&apos;re talking viral campaigns,
            targeted ads, and killer landing pages.
          </li>
          <li>
            You&apos;ll be analyzing data like a ninja and optimizing like a
            pro, ensuring every click counts. Get ready to collaborate with a
            passionate team of engineers, designers, and mavericks. We&apos;re
            all about pushing boundaries and having a blast doing it.
          </li>
        </ul>
        <br />
        <br />
        <p>
          <b>Qualifications:</b>
        </p>
        <br />
        <ul>
          <li>
            Bachelor&apos;s degree in Information Technology, Business, or a
            related field.
          </li>
          <li>
            Proven experience in partnership development, vendor management, or
            a related role.
          </li>
          <li>Strong understanding of IT and technology trends</li>
          <li>Excellent communication and negotiation skills.</li>
          <li>
            Detail-oriented with strong organizational and project management
            abilities.
          </li>
        </ul>
        <br />
        <br />
        <p>
          <b>Sound like your jam? Then you&apos;re probably:</b>
        </p>
        <br />
        <ul>
          <li>
            A marketing mastermind with 3+ years of experience crushing it in
            the tech world.
          </li>
          <li>
            A wordsmith who can weave magic with copy that&apos;s clear,
            concise, and converts like crazy.
          </li>
          <li>
            A data whiz who can sniff out insights faster than a bloodhound on a
            steak.
          </li>
          <li>
            A social media guru who can make even the most complex tech seem
            irresistibly engaging.
          </li>
          <li>
            A creative problem-solver who thrives in a fast-paced, ever-evolving
            environment.
          </li>
          <li>
            A team player who&apos;s always down to brainstorm, collaborate, and
            celebrate victories.
          </li>
        </ul>
        <br />
        <br />
        <p>
          <b>But hold on, if you&apos;re one of these folks, keep scrolling:</b>
        </p>
        <br />
        <ul>
          <li>
            The &quot;just following orders&quot; type. We need someone who can
            think critically, challenge the status quo, and own their ideas.
          </li>
          <li>
            The &quot;data is boring&quot; crew. Data is our fuel, and you gotta
            love digging in and finding the golden nuggets.
          </li>
          <li>
            The &quot;social media is just for selfies&quot; gang. This
            ain&apos;t your grandma&apos;s Facebook. We&apos;re talking
            strategic campaigns that drive real results.
          </li>
          <li>
            The &quot;I need everything spoon-fed&quot; crowd. We empower our
            team, so be prepared to take initiative and run with things.
          </li>
        </ul>
        <br />
        <br />
        <p>
          <b>Perks</b>
        </p>
        <br />
        <ul>
          <li>
            SuperLabs is a growing start up in a massively overlooked industry
          </li>
          <li>
            You&apos;ll be working as part of the core team, things move fast
            here
          </li>
          <li>Massive career growth starting at the ground level</li>
        </ul>
        <br />
        <br />
        <p>
          <b>Job Description</b>
        </p>
        <br />*/}
        <ul>
          <p
            dangerouslySetInnerHTML={{ __html: jobDetail.job_description }}
          ></p>
        </ul>
        <div className="mt-6">
          {Date.now() > new Date(jobDetail.job_close_date).getTime() ? (
            <button
              disabled
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Closed
            </button>
          ) : (
            <button
              onClick={() =>
                navigate(`/job/${jobDetail.job_id}/${jobDetail.job_title}/apply`)
              }
              className="font-bold bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default JobDetail;