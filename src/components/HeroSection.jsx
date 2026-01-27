import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query.trim()));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Ambient floating glow */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(106,56,194,0.12),transparent_60%)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 py-24 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {/* Badge */}
        <motion.span
          variants={item}
          className="inline-flex px-4 py-2 rounded-full bg-[#F83002]/10 text-[#F83002] text-sm font-semibold tracking-wide"
        >
          #1 Career Platform
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
        >
          Search. Apply. <br />
          Build your{" "}
          <span className="text-[#6A38C2] relative inline-block">
            Dream Career
            {/* subtle underline animation */}
            <motion.span
              className="absolute left-0 -bottom-2 h-[6px] w-full bg-[#6A38C2]/20 rounded-full"
              animate={{ scaleX: [0.9, 1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg"
        >
          Discover opportunities, track applications, and get hired faster — all
          in one intelligent career platform.
        </motion.p>

        {/* Search */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.02 }}
          className="mt-12 flex w-full max-w-xl mx-auto items-center gap-3 rounded-full border bg-white px-4 py-2 shadow-lg focus-within:ring-2 focus-within:ring-[#6A38C2]/40 transition"
        >
          <Search className="text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Job title, skills, or company"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-sm md:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] px-6"
          >
            Search
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap justify-center gap-10 text-sm text-gray-500"
        >
          {[
            ["10k+", "Jobs"],
            ["5k+", "Companies"],
            ["50k+", "Candidates"],
          ].map(([value, label]) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              className="transition"
            >
              <span className="font-semibold text-gray-900">{value}</span>{" "}
              {label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
