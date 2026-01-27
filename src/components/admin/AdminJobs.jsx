import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto py-10 px-4"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#6A38C2]/10">
              <Briefcase className="text-[#6A38C2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Manage Jobs</h1>
              <p className="text-gray-500 text-sm">
                Filter, create, and manage all job postings
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              New Job
            </Button>
          </motion.div>
        </div>

        {/* FILTER */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <Input
              placeholder="Filter by name or role"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full md:w-auto"
            />
          </motion.div>
        </div>

        {/* JOB TABLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-md rounded-xl p-6"
        >
          <AdminJobsTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminJobs;
