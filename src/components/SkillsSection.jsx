import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Cpu, Layers } from "lucide-react"; // example icons

// Static skill/resource data
const skills = [
  {
    id: 1,
    title: "Frontend Development",
    icon: <Code className="h-8 w-8 text-white" />,
    description: "Learn React, Next.js, Tailwind CSS, and build stunning UIs.",
    color: "bg-[#A3CEF1]", // soft sky blue
  },
  {
    id: 2,
    title: "Backend Development",
    icon: <Database className="h-8 w-8 text-white" />,
    description: "Master Node.js, Express, MongoDB, and API design.",
    color: "bg-[#B8E1DD]", // soft mint green
  },
  {
    id: 3,
    title: "Data Science",
    icon: <Cpu className="h-8 w-8 text-white" />,
    description: "Work with Python, Pandas, ML algorithms and analytics.",
    color: "bg-[#FDE2E4]", // soft pink
  },
  {
    id: 4,
    title: "UI/UX & Design",
    icon: <Layers className="h-8 w-8 text-white" />,
    description: "Learn Figma, Adobe XD, and craft amazing interfaces.",
    color: "bg-[#FFF5BA]", // soft pastel yellow
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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SkillsSection = () => {
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
          Skills & Learning Resources
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={card}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${skill.color} p-6 rounded-xl shadow-lg cursor-pointer flex flex-col items-center text-center transition-all`}
            >
              <div className="mb-4">{skill.icon}</div>
              <h3 className="text-gray-800 font-semibold text-lg mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
