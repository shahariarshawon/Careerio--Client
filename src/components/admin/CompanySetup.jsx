import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Building2, Globe, MapPin } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-4 py-14"
      >
        <form onSubmit={submitHandler}>
          <div className="bg-white border rounded-2xl shadow-sm p-10">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#6A38C2]/10">
                  <Building2 className="text-[#6A38C2]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    Company Setup
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Update your company profile and branding details
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="flex items-center gap-2 mb-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </div>

            {/* FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Company Name</Label>
                <Input
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Globe size={14} /> Website
                </Label>
                <Input
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin size={14} /> Location
                </Label>
                <Input
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="md:col-span-2">
                <Label>Company Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </div>
            </div>

            {/* ACTION */}
            <div className="mt-10">
              {loading ? (
                <Button className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating…
                </Button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
                  >
                    Save Changes
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
