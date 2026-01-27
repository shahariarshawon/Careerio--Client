import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleSaveForLater = () => {
    // Here you can add your wishlist/save logic
    toast.success("Job saved for later!");
  };

  return (
    <motion.div
      className="p-6 rounded-xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Top info */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={job?.company?.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg text-gray-800">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">
            {job?.company?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="font-bold text-xl text-gray-900 hover:text-purple-700 transition-colors duration-300">
          {job?.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge className="text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-bold bg-purple-50 px-2 py-1 rounded">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-5">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button
          className="bg-[#7209b7] hover:bg-[#5f32ad] flex-1"
          onClick={handleSaveForLater}
        >
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;
