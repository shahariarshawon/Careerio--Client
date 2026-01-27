import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.6 },
    },
  };

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Decorative Floating Circles */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-[#6A38C2]/10 rounded-full blur-3xl"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#F83002]/10 rounded-full blur-3xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 tracking-wide"
          variants={item}
        >
          <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          variants={container}
        >
          {allJobs.length <= 0 ? (
            <motion.span
              className="text-gray-500 col-span-full"
              variants={item}
            >
              No Job Available
            </motion.span>
          ) : (
            allJobs.slice(0, 6).map((job) => (
              <motion.div
                key={job._id}
                variants={item}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LatestJobs;
