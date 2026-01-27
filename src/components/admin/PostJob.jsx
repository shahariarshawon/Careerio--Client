import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center w-full my-10 px-4"
      >
        <motion.form
          onSubmit={submitHandler}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 max-w-5xl w-full bg-white border border-gray-200 shadow-xl rounded-2xl"
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#6A38C2]/10 rounded-xl">
              <Briefcase className="text-[#6A38C2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Post New Job</h1>
              <p className="text-gray-500 text-sm">
                Fill out the details to create a new job posting
              </p>
            </div>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Title", name: "title", placeholder: "Job Title" },
              {
                label: "Description",
                name: "description",
                placeholder: "Job Description",
              },
              {
                label: "Requirements",
                name: "requirements",
                placeholder: "Job Requirements",
              },
              { label: "Salary", name: "salary", placeholder: "Salary" },
              {
                label: "Location",
                name: "location",
                placeholder: "Job Location",
              },
              {
                label: "Job Type",
                name: "jobType",
                placeholder: "Job Type",
              },
              {
                label: "Experience Level",
                name: "experience",
                placeholder: "Experience Level",
              },
              { label: "No of Positions", name: "position", type: "number" },
            ].map((field, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Label>{field.label}</Label>
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  value={input[field.name]}
                  placeholder={field.placeholder}
                  onChange={changeEventHandler}
                  className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </motion.div>
            ))}

            {/* Company Select */}
            {companies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full md:w-[220px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6"
          >
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
              >
                Post Job
              </Button>
            )}
          </motion.div>

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting a job
            </p>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default PostJob;
