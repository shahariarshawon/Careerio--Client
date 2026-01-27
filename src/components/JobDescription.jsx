import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  CalendarDays,
} from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(
    singleJob?.applications?.some((app) => app.applicant === user?._id) ||
      false,
  );

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (app) => app.applicant === user?._id,
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <motion.div
      className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-3xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {singleJob?.title}
          </h1>
          <h1 className="text-2xl font-semibold text-gray-900">
            {singleJob?.company?.name}
          </h1>
          <p className="mt-1 text-gray-500 flex items-center gap-2">
            <MapPin size={16} /> {singleJob?.location || "Dhaka, Bangladesh"}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <Badge className="bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full">
              <Briefcase size={14} /> {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded-full">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full">
              <DollarSign size={14} /> {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-xl px-6 py-3 text-white font-semibold transition-all duration-300 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Section */}
      <motion.div
        className="mt-8 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold border-b pb-2 border-gray-200 text-gray-900">
          Job Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-purple-600" />
            <span className="font-semibold">Role:</span>
            <span className="text-gray-800">{singleJob?.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" />
            <span className="font-semibold">Location:</span>
            <span className="text-gray-800">
              {singleJob?.location || "India"}
            </span>
          </div>

          <div className="flex items-start gap-2 col-span-1 md:col-span-2">
            <Briefcase size={16} className="text-green-600 mt-1" />
            <span className="font-semibold">Description:</span>
            <span className="text-gray-800">{singleJob?.description}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-600" />
            <span className="font-semibold">Total Applicants:</span>
            <span className="text-gray-800">
              {singleJob?.applications?.length || 0}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-purple-600" />
            <span className="font-semibold">Posted Date:</span>
            <span className="text-gray-800">
              {singleJob?.createdAt
                ? new Date(singleJob.createdAt).toLocaleDateString()
                : "Loading..."}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-600" />
            <span className="font-semibold">Salary:</span>
            <span className="text-gray-800">{singleJob?.salary} LPA</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-red-600" />
            <span className="font-semibold">Experience:</span>
            <span className="text-gray-800">{singleJob?.experience} yrs</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobDescription;
