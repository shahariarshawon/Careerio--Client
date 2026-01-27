import React from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Project Manager",
  "Data Analyst",
  "Digital Marketer",
  "HR Executive",
  "Sales Executive",
  "Customer Support",
  "Content Writer",
];

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

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 tracking-wide"
          variants={item}
        >
          Explore Popular Job Categories
        </motion.h2>
        <motion.p
          className="text-gray-500 mb-12 max-w-2xl mx-auto"
          variants={item}
        >
          Quickly filter and find jobs in your area of expertise.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={container}
        >
          {category.map((cat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full px-6 py-3 shadow-sm hover:shadow-lg transition-all text-sm md:text-base font-medium"
              >
                {cat}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Ambient floating background circles */}
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
    </section>
  );
};

export default CategoryCarousel;
