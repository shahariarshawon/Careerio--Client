import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, isAdmin, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/edit-blog/${blog._id}`);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border overflow-hidden relative hover:shadow-lg transition"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <span className="text-xs uppercase tracking-wide text-[#6A38C2] font-semibold">
          {blog.category}
        </span>

        <h2 className="text-lg font-semibold mt-2 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <span>{blog.author}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {isAdmin && (
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={handleEdit}
              className="bg-[#6A38C2] text-white hover:bg-[#53289f]"
            >
              Update
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(blog._id)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogCard;
