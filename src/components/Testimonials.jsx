import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Google",
    message:
      "Career.io helped me land my dream job within a month. The platform is so intuitive and efficient!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Ravi Patel",
    role: "Data Scientist",
    company: "Amazon",
    message:
      "I found amazing opportunities here and the application process is seamless. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Emma Watson",
    role: "UI/UX Designer",
    company: "Adobe",
    message:
      "The best career platform I've ever used. The tips, insights, and jobs are top-notch!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
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

const Testimonials = () => {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-10 tracking-wide"
          variants={card}
        >
          What Our Users Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={card}
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="text-left">
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500">
                    {t.role} @ {t.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{t.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
