import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 py-10"
      >
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Company Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage registered companies and hiring partners
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="flex items-center gap-2 bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              <Plus size={16} />
              New Company
            </Button>
          </motion.div>
        </div>

        {/* FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border shadow-sm p-4 mb-6 flex items-center gap-3"
        >
          <Search className="text-gray-400" size={18} />
          <Input
            placeholder="Filter companies by name…"
            onChange={(e) => setInput(e.target.value)}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </motion.div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border shadow-sm overflow-hidden"
        >
          <CompaniesTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Companies;
