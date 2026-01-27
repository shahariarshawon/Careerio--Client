import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { motion } from "framer-motion";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = Boolean(user?.profile?.resume);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md"
      >
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 border-2 border-purple-600 shadow">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {user?.profile?.bio || "No bio available."}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="rounded-full p-3 hover:bg-purple-50 transition"
          >
            <Pen className="text-purple-600" />
          </Button>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 mt-6 text-gray-700"
        >
          <div className="flex items-center gap-3">
            <Mail className="text-purple-600" />
            <span>{user?.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-purple-600" />
            <span>{user?.phoneNumber || "N/A"}</span>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-6"
        >
          <h2 className="font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0
              ? user.profile.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded hover:text-white hover:cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))
              : "N/A"}
          </div>
        </motion.div>

        {/* Resume */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-6"
        >
          <Label className="font-bold mb-2">Resume </Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>N/A</span>
          )}
        </motion.div>
      </motion.div>

      {/* Applied Jobs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-5"
      >
        <h1 className="font-bold text-xl mb-5 text-gray-800">Applied Jobs</h1>
        <AppliedJobTable />
      </motion.div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
