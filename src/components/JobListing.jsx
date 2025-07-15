import { useState} from "react";
import { FaMapMarker, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const JobListing = ({ job }) => {
  const [showFullDescription, setshowFullDescription] = useState(false);
  const [LikeJob, setLikeJob] = useState(false);


  useEffect(() => {
    const likedJobs = JSON.parse(localStorage.getItem("likedJobs")) || [];
    setLikeJob(likedJobs.includes(job.id));
  }, [job.id]);

  

  let description = job.description;
  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }



 const handleLikeClick = () => {
   const likedJobs = JSON.parse(localStorage.getItem("likedJobs")) || [];

   let updatedLikes;
   if (LikeJob) {
     updatedLikes = likedJobs.filter((id) => id !== job.id);
   } else {
     updatedLikes = [...likedJobs, job.id];
   }

   localStorage.setItem("likedJobs", JSON.stringify(updatedLikes));
   setLikeJob(!LikeJob);
 };






  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2 flex flex-col lg:flex-row justify-between mb-4">
            {job.type}

            <button
              onClick={handleLikeClick}
              className={LikeJob ? "text-red-500" : "text-gray-400"}
              type="button"
            >
              <FaHeart className="inline" />
            </button>
          </div>

          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <div className="mb-5">{description}</div>

        <button
          onClick={() => setshowFullDescription((prev) => !prev)}
          className="text-indigo-500 mb-5 hover:text-indigo-600"
        >
          {showFullDescription ? "Less" : "More"}
        </button>

        <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mr-1 mb-1" />
            {job.location}
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
