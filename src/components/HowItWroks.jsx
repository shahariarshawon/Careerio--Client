import React from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Briefcase } from "lucide-react"; // Example icons

const steps = [
  {
    id: 1,
    title: "Search Jobs",
    description:
      "Explore thousands of jobs across multiple industries with powerful filters to find your dream role.",
    icon: <Search className="h-8 w-8 text-[#6A38C2]" />,
  },
  {
    id: 2,
    title: "Apply Easily",
    description:
      "Apply to your favorite jobs with a single click. Your profile and resume are ready to impress recruiters.",
    icon: <UserPlus className="h-8 w-8 text-[#6A38C2]" />,
  },
  {
    id: 3,
    title: "Land Your Dream Job",
    description:
      "Get hired by top companies and take the next step in your career. Track applications and stay updated.",
    icon: <Briefcase className="h-8 w-8 text-[#6A38C2]" />,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-12 tracking-wide"
          variants={card}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={card}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
