import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Users } from "lucide-react"; // icons for clarity

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl shadow-md hover:shadow-2xl bg-white border border-gray-200 cursor-pointer transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Top Section: Company & Job Type */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg text-gray-900">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={14} /> {job?.location}
          </p>
        </div>
        <Badge
          className="text-sm text-white bg-purple-600 px-3 py-1 rounded-full shadow-md"
          variant="default"
        >
          {job?.jobType}
        </Badge>
      </div>

      {/* Middle Section: Job Title & Description */}
      <div className="mt-4">
        <h1 className="font-extrabold text-2xl text-gray-900 hover:text-purple-600 transition-colors duration-300">
          {job?.title}
        </h1>
        <p className="text-gray-700 text-sm mt-2 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Bottom Section: Highlights */}
      <div className="flex flex-wrap items-center gap-4 mt-5 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <Briefcase size={16} className="text-purple-600" />
          <span>{job?.position} Positions</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <DollarSign size={16} className="text-green-600" />
          <span>{job?.salary} LPA</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <Users size={16} className="text-blue-600" />
          <span>{job?.applications?.length || 0} Applicants</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
