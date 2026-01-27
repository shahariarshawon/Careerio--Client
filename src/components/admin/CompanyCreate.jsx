import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create company");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <div className="bg-white border rounded-2xl shadow-sm p-10">
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-[#6A38C2]/10">
                <Building2 className="text-[#6A38C2]" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Create Your Company
              </h1>
            </div>
            <p className="text-gray-500 max-w-lg">
              Enter your company name to get started. You can update branding
              and details later from the company dashboard.
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium">Company Name</Label>
              <Input
                type="text"
                placeholder="e.g. JobHunt, Microsoft"
                className="mt-2 h-11"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  onClick={registerNewCompany}
                  className="bg-[#6A38C2] hover:bg-[#5b30a6] flex items-center gap-2"
                  disabled={!companyName}
                >
                  Continue
                  <ArrowRight size={16} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyCreate;
