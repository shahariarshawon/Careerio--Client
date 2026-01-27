import React from "react";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { id: 1, label: "Companies Hiring", value: 500 },
  { id: 2, label: "Active Job Seekers", value: 10000 },
  { id: 3, label: "Successful Placements", value: 1200 },
  { id: 4, label: "Learning Resources", value: 250 },
];

const FunExtras = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const statVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative overflow-hidden py-20 bg-gray-50">
      {/* Floating background shapes */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40  rounded-full opacity-30 filter blur-3xl animate-pulse"
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56  rounded-full opacity-30 filter blur-3xl animate-pulse"
        style={{ zIndex: 0 }}
      />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#6A38C2]">
          Fun Extras
        </h2>
        <p className="text-gray-700 mb-16">
          Dynamic numbers, background motion, and interactive statistics that
          bring Career.io to life.
        </p>

        {/* Stats Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={statVariants}
              initial="hidden"
              animate={controls}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform"
            >
              <h3 className="text-3xl font-bold text-gray-700">
                {inView ? (
                  <CountUp end={stat.value} duration={2} separator="," />
                ) : (
                  0
                )}
                +
              </h3>
              <p className="text-gray-600 mt-2 text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunExtras;
