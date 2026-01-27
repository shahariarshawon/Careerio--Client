import React from "react";
import { motion } from "framer-motion";

// Sample static data for featured companies
const companies = [
  {
    id: 1,
    name: "Google",
    logo: "https://i.postimg.cc/76cvNFz4/vecteezy-google-lens-icon-logo-symbol-22484503.png",
  },
  {
    id: 2,
    name: "Amazon",
    logo: "https://i.postimg.cc/1tLmznJs/vecteezy-amazon-logo-png-amazon-icon-transparent-png-19766240.png",
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "https://i.postimg.cc/Jh0MccF1/vecteezy-microsoft-logo-png-microsoft-icon-transparent-png-27127493.png",
  },
  {
    id: 4,
    name: "Brain Station 23",
    logo: "https://i.postimg.cc/XqCvKcpG/Brain-Station-23-Ltd-removebg-preview.png",
  },
  {
    id: 5,
    name: "Facebook",
    logo: "https://i.postimg.cc/ZnZQjJqr/vecteezy-facebook-logo-png-facebook-icon-transparent-png-18930698.png",
  },
  {
    id: 6,
    name: "Apple",
    logo: "https://i.postimg.cc/HW2vdDxR/vecteezy-apple-1199813.png",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const logoCard = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FeaturedCompanies = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-12 tracking-wide"
          variants={logoCard}
        >
          Featured Companies
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
          {companies.map((company) => (
            <motion.div
              key={company.id}
              variants={logoCard}
              whileHover={{ scale: 1.1, y: -3 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all flex items-center justify-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-16 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedCompanies;
