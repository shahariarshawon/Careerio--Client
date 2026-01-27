import React from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Blogs = () => {
  const staticBlogs = [
    {
      _id: "1",
      title: "Mastering React in 2026",
      category: "Frontend Development",
      description: "Learn React step by step and build amazing SPAs.",
      author: "Odinson Thor",
      createdAt: "2026-01-25T10:00:00Z",
      image: "https://i.postimg.cc/KvT00x8R/image.png",
    },
    {
      _id: "2",
      title: "Node.js Best Practices",
      category: "Backend Development",
      description: "Write clean, scalable backend code with Node.js & Express.",
      author: "Black Panther",
      createdAt: "2026-01-24T09:30:00Z",
      image: "https://i.postimg.cc/05TfMF0D/image.png",
    },
    {
      _id: "3",
      title: "Fullstack Development Roadmap",
      category: "FullStack Development",
      description: "A complete roadmap to becoming a Fullstack Developer.",
      author: "Captain America",
      createdAt: "2026-01-23T12:00:00Z",
      image: "https://i.postimg.cc/d0NRqx0q/image.png",
    },
    {
      _id: "4",
      title: "UI/UX Design Essentials",
      category: "UI/UX Designer",
      description: "Learn Figma & Adobe XD to create user-friendly designs.",
      author: "Spiderman",
      createdAt: "2026-01-22T14:00:00Z",
      image: "https://i.postimg.cc/dtc2tdJh/image.png",
    },
    {
      _id: "5",
      title: "Introduction to Data Science",
      category: "Data Science",
      description: "Learn Python, Pandas, and machine learning algorithms.",
      author: "Boogeyman",
      createdAt: "2026-01-21T16:00:00Z",
      image: "https://i.postimg.cc/fL0dMWFH/image.png",
    },
    {
      _id: "6",
      title: "Mobile App Development Trends 2026",
      category: "Mobile App Developer",
      description:
        "Stay ahead with the latest trends in iOS and Android app development.",
      author: "Iron Man",
      createdAt: "2026-01-20T10:00:00Z",
      image: "https://i.postimg.cc/KY1k5vZY/image.png",
    },
    {
      _id: "7",
      title: "AI in Everyday Life",
      category: "AI Engineer",
      description:
        "Learn how artificial intelligence is transforming industries and daily life.",
      author: "Mark Zuckerberg",
      createdAt: "2026-01-19T12:30:00Z",
      image: "https://i.postimg.cc/6p3y954H/image.png",
    },
    {
      _id: "8",
      title: "Machine Learning Basics",
      category: "Machine Learning Engineer",
      description:
        "A beginner-friendly guide to ML concepts, models, and algorithms.",
      author: "Mark Zuckerberg",
      createdAt: "2026-01-18T14:00:00Z",
      image: "https://i.postimg.cc/sgvDk6bJ/image.png",
    },
    {
      _id: "9",
      title: "Data Analytics for Business",
      category: "Data Analyst",
      description:
        "Learn to turn raw data into actionable insights for business decisions.",
      author: "Bill Gates",
      createdAt: "2026-01-17T16:00:00Z",
      image: "https://i.postimg.cc/sD1rxBKR/image.png",
    },
    {
      _id: "10",
      title: "Cybersecurity Essentials",
      category: "Software Engineer",
      description:
        "Understand the fundamentals of protecting applications and user data.",
      author: "Steve Jobs",
      createdAt: "2026-01-16T09:00:00Z",
      image: "https://i.postimg.cc/HsFfL6V5/image.png",
    },
    {
      _id: "11",
      title: "Cloud Computing Simplified",
      category: "Backend Development",
      description:
        "Learn cloud concepts, deployment, and modern infrastructure practices.",
      author: "Will Smith",
      createdAt: "2026-01-15T11:30:00Z",
      image: "https://i.postimg.cc/YSzVbk8N/image.png",
    },
    {
      _id: "12",
      title: "Effective Remote Work Strategies",
      category: "FullStack Development",
      description:
        "Tips and tools to maximize productivity while working remotely.",
      author: "Jhon Williamson",
      createdAt: "2026-01-14T13:00:00Z",
      image: "https://i.postimg.cc/PJ9FPqrk/image.png",
    },
  ];

  if (!Array.isArray(staticBlogs) || staticBlogs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">No blogs available</div>
    );
  }

  return (
    <>
      {" "}
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-wide">Career Insights</h1>
          <p className="text-gray-500 mt-2">
            Practical advice to level up your career
          </p>
        </div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {staticBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
