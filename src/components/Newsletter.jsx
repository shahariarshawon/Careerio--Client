import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { NEWSLETTER_API_END_POINT } from "@/utils/constant";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email address");

    setLoading(true);
    try {
      const res = await axios.post(`${NEWSLETTER_API_END_POINT}/subscribe`, {
        email,
      });
      toast.success(res.data.message);
      setEmail("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative bg-gradient-to-r from-[#65b4f4] to-[#0a5372] rounded-2xl px-6 py-12 max-w-5xl mx-auto my-20 text-center shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-[#65b4f4] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
        style={{ zIndex: 0 }}
      />

      <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-4 z-10">
        Stay Updated with Career.io
      </h2>
      <p className="relative text-white/90 mb-8 z-10">
        Subscribe to our newsletter and never miss job updates, career tips, and
        learning resources.
      </p>

      <form
        onSubmit={submitHandler}
        className="relative flex justify-center items-center gap-2 z-10"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-[#6A38C2]"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Subscribe"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Newsletter;
