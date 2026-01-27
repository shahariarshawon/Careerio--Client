import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md bg-white rounded-2xl p-6 shadow-lg overflow-hidden"
        onInteractOutside={() => setOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-gray-800">
              Update Profile
            </DialogTitle>
            <Button
              variant="ghost"
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </DialogHeader>

          <form onSubmit={submitHandler} className="mt-4">
            <div className="grid gap-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="mt-1"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="mt-1"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="mt-1"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="mt-1"
                  placeholder="Short bio"
                />
              </div>

              {/* Skills */}
              <div className="flex flex-col">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  type="text"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="mt-1"
                  placeholder="e.g. React, Node.js, CSS"
                />
              </div>

              {/* Resume Upload */}
              <div className="flex flex-col">
                <Label htmlFor="resume">Resume (PDF)</Label>
                <Input
                  id="resume"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="mt-1"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
