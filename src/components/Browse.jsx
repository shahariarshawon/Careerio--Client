import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion, AnimatePresence } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <motion.div
        className="max-w-7xl mx-auto my-10 px-4 md:px-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-bold text-3xl md:text-4xl mb-6 text-gray-800">
          Search Results{" "}
          <span className="text-[#6A38C2]">({allJobs.length})</span>
        </h1>

        {allJobs.length <= 0 ? (
          <motion.div
            className="text-center text-gray-500 mt-20 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No jobs found
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {allJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Browse;
